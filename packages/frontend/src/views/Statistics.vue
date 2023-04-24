<template>
  <div class="container">
    <a-row justify="center">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        :xxl="24"
        :xxxl="24"
        class="navigator"
      >
        <a-typography-title :level="1">Beancount Analysis Web</a-typography-title>
        <a-button @click="goToSettingPage" size="small"
          ><template #icon><setting-outlined /></template>设置</a-button
        >
      </a-col>
    </a-row>

    <a-row justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" :xxl="20" :xxxl="20">
        <a-card>
          <template #title>
            <div class="operator">
              <div class="switcher">
                <a-space>
                  <a-radio-group
                    v-model:value="selectedDateMode"
                    :options="dateModeOptions"
                    optionType="button"
                    @change="onSwitchDateMode"
                  ></a-radio-group>
                  <loading-outlined v-if="dateTimeSelectLoading" />
                  <a-select
                    v-model:value="selectedDatetime"
                    @change="onDatetimeChange"
                    v-if="!dateTimeSelectLoading"
                  >
                    <a-select-option
                      v-for="item in date"
                      :key="item"
                      :value="item"
                      >{{ item }}</a-select-option
                    >
                  </a-select>
                </a-space>
              </div>
              <div class="account-tabs">
                <a-tabs
                  v-model:activeKey="selectedAccount"
                  centered
                  :tabBarStyle="{ marginBottom: '-1px' }"
                  @change="onAccountChange"
                >
                  <a-tab-pane
                    v-for="account in accounts"
                    :key="account.key"
                    :tab="account.tab"
                  ></a-tab-pane>
                </a-tabs>
              </div>
            </div>
          </template>
          <template #extra>
            <a-radio-group
              v-model:value="selectedChartMode"
              v-if="selectedDateMode === 'year'"
            >
              <a-radio-button value="line"
                ><line-chart-outlined
              /></a-radio-button>
              <a-radio-button value="column"
                ><bar-chart-outlined
              /></a-radio-button>
            </a-radio-group>
            <a-dropdown v-if="selectedDateMode === 'month'">
              <template #overlay>
                <a-menu @click="chooseAccountLevel">
                  <a-menu-item key="2">大类</a-menu-item>
                  <a-menu-item key="3">小类</a-menu-item>
                </a-menu>
              </template>
              <a-button>
                级别
                <DownOutlined />
              </a-button>
            </a-dropdown>
          </template>

          <div class="statistics">
            <loading-outlined v-if="chartLoading" />
            <div class="indicator">
              <a-statistic
                v-if="!chartLoading && chartData.length > 0"
                :title="`${getValueByOtherKey(
                  dateModeOptions,
                  'value',
                  selectedDateMode,
                  'label'
                )}${getValueByOtherKey(
                  accounts,
                  'key',
                  selectedAccount,
                  'tab'
                )}`"
                :value="total"
              />
              <a-statistic
                v-if="!chartLoading && chartData.length > 0 && selectedAccount === 'expenses'"
                :title="`${
                  selectedDateMode === 'year' ? '月' : '日'
                }均${getValueByOtherKey(
                  accounts,
                  'key',
                  selectedAccount,
                  'tab'
                )}`"
                :value="average"
              />
            </div>
            <div class="chart" v-if="!chartLoading">
              <line-chart
                :data="chartData"
                v-if="
                  selectedChartMode === 'line' && selectedDateMode === 'year'
                "
              ></line-chart>
              <column-chart
                :data="chartData"
                v-if="
                  selectedChartMode === 'column' && selectedDateMode === 'year'
                "
              ></column-chart>
              <pie-chart
                :data="chartData"
                v-if="
                  selectedChartMode === 'pie' && selectedDateMode === 'month'
                "
              ></pie-chart>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { getConfig, getData, getLedgerYearAndMonth } from "../api/apiClient";
import _ from "lodash";
import { RadioChangeEvent } from "ant-design-vue/es/radio/interface";
import {
  Account,
  BeanData,
  ChartMode,
  DateMode,
  YearMonth,
} from "../interfaces";
import {
  SettingOutlined,
  LoadingOutlined,
  LineChartOutlined,
  BarChartOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import router from "../router";

const dateModeOptions = [
  { label: "年", value: "year" },
  {
    label: "月",
    value: "month",
  },
];
let selectedDateMode = ref<DateMode>("year");
let selectedDatetime = ref<String | Number>("");
let date = ref<number[] | string[]>([]);
let yearMonthData = reactive<YearMonth[]>([]);
let chartData = reactive<BeanData[] | []>([]);
let chartLoading = ref<Boolean>(false);
let dateTimeSelectLoading = ref<Boolean>(false);
let selectedChartMode = ref<ChartMode>("line");
let accountLevel = ref("2");
let total = ref<Number | null>(null);
let average = ref<String>("");
const accounts = ref([
  { key: "expenses", tab: "支出" },
  { key: "income", tab: "收入" },
]);
const selectedAccount = ref<Account>("expenses");

onBeforeMount(async () => {
  const config = await getConfig();
  if (config && config.beanFilePath !== "") {
    yearMonthData.length = 0;
    dateTimeSelectLoading.value = true;
    const yearAndMonth = await getLedgerYearAndMonth();
    if (yearAndMonth) {
      yearMonthData = yearAndMonth;
      dateTimeSelectLoading.value = false;
    }
    switchDate();
  } else {
    router.replace({ name: "BeanCountConfig" });
  }
});
const goToSettingPage = () => {
  router.replace({ name: "BeanCountConfig" });
};
const onSwitchDateMode = (e: RadioChangeEvent) => {
  selectedDateMode.value = e.target.value;
  switchDate();
};
/**
 * 根据选择的日期模式切换日期
 */
const switchDate = () => {
  // 根据选择的日期模式设置日期数组和选择的日期
  if (selectedDateMode.value === "year") {
    date.value = getUniqueYears(yearMonthData);
    selectedDatetime.value = date.value[date.value.length - 1];
    selectedChartMode.value = "line";
  } else if (selectedDateMode.value === "month") {
    date.value = formatYearMonthArray(yearMonthData);
    selectedDatetime.value = date.value[date.value.length - 1];
    selectedChartMode.value = "pie";
  }
  // 根据选择的日期模式和选择的日期获取数据
  const datetimeString = selectedDatetime.value.toString().split("/");
  fetchData(selectedAccount.value, selectedDateMode.value, {
    year:
      selectedDateMode.value === "year"
        ? selectedDatetime.value
        : datetimeString[0],
    month: selectedDateMode.value === "month" ? datetimeString[1] : undefined,
    level: selectedDateMode.value === "month" ? accountLevel.value : undefined,
  });
};

/**
 * 当选择的日期发生变化时获取数据
 */
const onDatetimeChange = () => {
  const datetimeString = selectedDatetime.value.toString().split("/");
  fetchData(selectedAccount.value, selectedDateMode.value, {
    year:
      selectedDateMode.value === "year"
        ? selectedDatetime.value
        : datetimeString[0],
    month: selectedDateMode.value === "month" ? datetimeString[1] : undefined,
    level: accountLevel.value,
  });
  // 根据选择的日期模式设置图表类型
  selectedChartMode.value = selectedDateMode.value === "year" ? "line" : "pie";
};

const chooseAccountLevel = (item: { key: string }) => {
  accountLevel.value = item.key;
  onDatetimeChange();
};

const onAccountChange = () => {
  onDatetimeChange();
};

const fetchData = async (account: Account, range: DateMode, options: any) => {
  chartLoading.value = true;
  const data = await getData(account, range, options);
  if (data) {
    chartData = data;
    total.value = sumAmounts(data);
    average.value = averageAmounts(Number(total.value), data.length);
    chartLoading.value = false;
  }
};

/**
 * 获取唯一的年份
 * @param {YearMonth[]} arr - 包含年月信息的数组
 * @returns {number[]} - 唯一的年份数组
 */
function getUniqueYears(arr: YearMonth[]): number[] {
  const uniqueYears = _.uniqBy(arr, "year");
  return uniqueYears.map((item: YearMonth) => item.year);
}

/**
 * 格式化年月数组
 * @param {YearMonth[]} arr - 包含年月信息的数组
 * @returns {string[]} - 格式化后的年月字符串数组
 */
function formatYearMonthArray(arr: YearMonth[]): string[] {
  return _.map(arr, (item: YearMonth) => `${item.year}/${item.month}`);
}

/**
 * 根据一个属性值获取另一个属性值。
 *
 * @param {Array<Object>} arr - 包含要查找的对象的数组。
 * @param {string} searchKey - 要匹配的键（例如，`value` 或 `key`）。
 * @param {string} searchValue - 要查找的值。
 * @param {string} resultKey - 要返回的属性的键（例如，`label` 或 `tab`）。
 * @returns {string | undefined} 如果找到匹配的对象，则返回对象的指定属性值（`resultKey`）；否则，返回 `undefined`。
 */
function getValueByOtherKey<T extends object>(
  arr: T[],
  searchKey: keyof T,
  searchValue: T[keyof T],
  resultKey: keyof T
): T[keyof T] | undefined {
  const item = arr.find((dataItem) => dataItem[searchKey] === searchValue);
  return item ? item[resultKey] : undefined;
}

/**
 * 计算数据中所有金额的总和
 * @param {BeanData[]} data - 包含金额信息的数据数组
 * @returns {number} - 所有金额的总和
 */
function sumAmounts(data: BeanData[]): number {
  let total = 0;
  data.forEach((item) => {
    total += Math.round(item.amount * 100);
  });
  return total / 100;
}

/**
 * 计算数据中所有金额的平均数
 * @param {number} total - 总数
 * @returns {number} - 所有金额的平均数
 */
function averageAmounts(total: number, count: number): string {
  return (total / count).toFixed(2);
}
</script>
<style>
.container h1.ant-typography{
  margin-bottom: 0;
  font-size: 24px;
}

.navigator {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 32px;
}

.operator {
  display: flex;
  align-items: center;
  justify-content: start;
}

.account-tabs {
  flex: 1;
}

.account-tabs .ant-tabs-top {
  margin-bottom: 0;
}

.statistics {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.indicator {
  display: flex;
  gap: 16px;
  padding: 16px 0;
}

.indicator div {
  flex: 1;
}

.chart {
  margin-top: 16px;
}

.chart > div {
  width: 100%;
}
</style>
