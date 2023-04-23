<template>
  <div class="container">
    <div class="tip">
      <a-alert
        description="您尚未配置任何有关 beancount 的信息，请在下方填写"
        type="info"
        show-icon
        v-if="showTip"
      >
        <template #icon><smile-outlined /></template>
      </a-alert>
    </div>
    <a-row jusitify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" :xxl="20" :xxxl="20">
        <a-form :model="configForm">
          <a-form-item label="文件路径">
            <a-input
              v-model:value="configForm.beanFilePath"
              placeholder="/Users/your-username/beancount-file-path/main.bean"
            />
          </a-form-item>
          <a-form-item label="货币单位">
            <a-input
              v-model:value="configForm.operatingCurrency"
              placeholder="CNY"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              @click="save"
              :loading="loading"
              >保存</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css"; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
import { SmileOutlined } from "@ant-design/icons-vue";

import { onBeforeMount, ref } from "vue";
import { getConfig, saveConfig } from "../api/apiClient";
import { Config } from "../interfaces";
import router from "../router";
let configForm = ref<Config>({ beanFilePath: "", operatingCurrency: "" });
let showTip = ref<Boolean>(false);
let loading = ref<Boolean>(false);
onBeforeMount(async () => {
  const config = await getConfig();
  if (config && config.beanFilePath !== "" && config.operatingCurrency !== "") {
    configForm.value = config;
  } else {
    showTip.value = true;
  }
});
const save = async () => {
  loading.value = true;
  const saveResult = await saveConfig(
    configForm.value.beanFilePath,
    configForm.value.operatingCurrency
  );
  loading.value = false;
  if (saveResult && saveResult.status === 1) {
    message.success("保存成功");
    router.replace({ name: "Statistics" });
  } else {
    message.error("保存失败，请重试");
  }
};
</script>
