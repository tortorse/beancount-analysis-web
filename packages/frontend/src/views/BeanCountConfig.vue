<template>
  <div class="container">
    <a-row justify="center" v-if="!showTip">
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
        <a-button @click="gotoStatisticsPage" size="small" type="text"
          ><template #icon><left-outlined /></template>统计分析</a-button
        >
      </a-col>
    </a-row>
    <div class="tip" v-if="showTip">
      <a-alert
        description="您尚未配置任何有关 beancount 的信息，请在下方填写"
        type="info"
        show-icon
        banner
      >
        <template #icon><smile-outlined /></template>
      </a-alert>
    </div>
    <a-row justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" :xxl="20" :xxxl="20">
        <a-card>
          <a-form
            :model="configForm"
            autocomplete="off"
            name="config"
            @finish="save"
            @finishFailed="saveFailue"
          >
            <a-form-item
              label="文件路径"
              name="beanFilePath"
              :rules="[
                {
                  required: true,
                  validator: checkFile,
                },
              ]"
            >
              <a-input
                v-model:value="configForm.beanFilePath"
                placeholder="/your-beancount-file-path/your-beanfile.bean"
              >
              </a-input>
            </a-form-item>
            <a-form-item
              label="货币单位"
              name="operatingCurrency"
              :rules="[{ required: true, message: '请输入货币单位' }]"
            >
              <a-input
                v-model:value="configForm.operatingCurrency"
                placeholder="CNY"
              />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :loading="buttonLoading"
                >保存</a-button
              >
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css"; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
import { LeftOutlined, SmileOutlined } from "@ant-design/icons-vue";

import { onBeforeMount, ref } from "vue";
import { checkBeanFileExist, getConfig, saveConfig } from "../api/apiClient";
import { Config } from "../interfaces";
import router from "../router";
import { Rule } from "ant-design-vue/lib/form/interface";
let configForm = ref<Config>({ beanFilePath: "", operatingCurrency: "" });
let showTip = ref<Boolean>(false);
let buttonLoading = ref<Boolean>(false);
let checkLoading = ref<Boolean>(false);

onBeforeMount(async () => {
  const config = await getConfig();
  if (config && config.beanFilePath !== "" && config.operatingCurrency !== "") {
    configForm.value = config;
  } else {
    showTip.value = true;
  }
});
const save = async () => {
  buttonLoading.value = true;
  const saveResult = await saveConfig(
    configForm.value.beanFilePath,
    configForm.value.operatingCurrency
  );
  buttonLoading.value = false;
  if (saveResult && saveResult.status === 1) {
    message.success("保存成功");
    router.replace({ name: "Statistics" });
  } else {
    message.error("保存失败，请重试");
  }
};

const saveFailue = (errorInfo: Error) => {
  console.log("Failed:", errorInfo);
};

const checkFile = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入完整的 bean 文件路径");
  } else {
    const checkResult = await checkBeanFileExist(value);
    if (!checkResult) {
      return Promise.reject("bean 文件不存在，请检查");
    }
  }
};

const gotoStatisticsPage = () => {
  router.replace({ name: "Statistics" });
};
</script>
<style>
.tip {
  margin-bottom: 32px;
}
</style>
