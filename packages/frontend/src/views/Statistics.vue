<template>
  <div class="container">
    <div class="switcher">
      <a-radio-group
        v-model:value="selectedDateMode"
        :options="dateModeOptions"
        optionType="button"
        @change="switchDateMode"
      ></a-radio-group>
      <a-select v-model:value="selectedDatetime">
        <a-select-option v-for="item in date" :key="item" :value="item">{{
          item
        }}</a-select-option>
      </a-select>
    </div>
    <div class="chart">
      
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { getConfig, getLedgerYearAndMonth } from "../api/apiClient";
import _ from "lodash";
import { RadioChangeEvent } from "ant-design-vue/es/radio/interface";
import router from "../router";
import { YearMonth } from "../interfaces";

const dateModeOptions = [
  { label: "年", value: "year" },
  {
    label: "月",
    value: "month",
  },
];
let selectedDateMode = ref<String>("year");
let selectedDatetime = ref<String | Number>("");
let date = ref<number[] | string[]>([]);
let yearMonthData = reactive<YearMonth[]>([]);
onBeforeMount(async () => {
  const config = await getConfig();
  if (config && config.beanFilePath !== "") {
    yearMonthData.length = 0;
    const yearAndMonth = await getLedgerYearAndMonth();
    if (yearAndMonth) {
      yearMonthData = yearAndMonth;
    }
    switchDate();
  } else {
    router.replace({ name: "BeanCountConfig" });
  }
});
const switchDateMode = (e: RadioChangeEvent) => {
  selectedDateMode.value = e.target.value;
  switchDate();
};

const switchDate = () => {
  if (selectedDateMode.value === "year") {
    date.value = getUniqueYears(yearMonthData);
    selectedDatetime.value = date.value[date.value.length - 1];
    return;
  }
  if (selectedDateMode.value === "month") {
    date.value = formatYearMonthArray(yearMonthData);
    selectedDatetime.value = date.value[date.value.length - 1];
    return;
  }
};

function getUniqueYears(arr: YearMonth[]): number[] {
  const uniqueYears = _.uniqBy(arr, "year");
  return uniqueYears.map((item) => item.year);
}

function formatYearMonthArray(arr: YearMonth[]): string[] {
  return _.map(arr, (item) => `${item.year}/${item.month}`);
}
</script>
<style scoped></style>
