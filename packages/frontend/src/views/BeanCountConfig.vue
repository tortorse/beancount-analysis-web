<template>
  <div class="container">
    <a-row justify="center" v-if="!showTip">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="24" :xxxl="24" class="navigator">
        <a-button @click="gotoStatisticsPage" size="small" type="text"><template #icon><left-outlined /></template>{{
          $t("statistic") }}</a-button>
      </a-col>
    </a-row>
    <div class="tip" v-if="showTip">
      <a-alert :description="$t('noBeancountInfo')" type="info" show-icon banner>
        <template #icon><smile-outlined /></template>
      </a-alert>
    </div>
    <a-row justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" :xxl="20" :xxxl="20">
        <a-card>
          <a-form :model="configForm" autocomplete="off" name="config" @finish="save" @finishFailed="saveFailue">
            <a-form-item :label="$t('filePath')" name="beanFilePath" :rules="[
                {
                  required: true,
                  validator: checkFile,
                },
              ]">
              <a-input v-model:value="configForm.beanFilePath" placeholder="/your-beancount-file-path/your-beanfile.bean">
              </a-input>
            </a-form-item>
            <a-form-item :label="$t('operatingCurrency')" name="operatingCurrency"
              :rules="[{ required: true, message: $t('enterCurrencyUnit') }]">
              <a-input v-model:value="configForm.operatingCurrency" placeholder="CNY" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="buttonLoading">{{ $t("save") }}</a-button>
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let configForm = ref<Config>({ beanFilePath: "", operatingCurrency: "" });
let showTip = ref<Boolean>(false);
let buttonLoading = ref<Boolean>(false);

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
    message.success(t('saveSuccess'));
    router.replace({ name: "Statistics" });
  } else {
    message.error(t('saveFailure'));
  }
};

const saveFailue = (errorInfo: Error) => {
  console.log("Failed:", errorInfo);
};

const checkFile = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject(t('enterCompleteBeanFilePath'));
  } else {
    const checkResult = await checkBeanFileExist(value);
    if (!checkResult) {
      return Promise.reject(t('beanFileNotExist'));
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
