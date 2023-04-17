<template>
  <div>
    <a-form :model="configForm">
      <a-form-item label="文件路径">
        <a-input v-model:value="configForm.beanFilePath" />
      </a-form-item>
      <a-form-item label="货币单位">
        <a-input v-model:value="configForm.operatingCurrency" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="save"
          >保存</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

import { onBeforeMount, ref } from "vue";
import { getConfig, saveConfig } from "../api/apiClient";
import { Config } from "../interfaces";
let configForm = ref<Config>({ beanFilePath: "", operatingCurrency: "" });
onBeforeMount(async () => {
  const config = await getConfig();
  if (config && config.beanFilePath !== "" && config.operatingCurrency !== "") {
    configForm.value = config;
  } else {
  }
});
const save = async () => {
  const saveResult = await saveConfig(
    configForm.value.beanFilePath,
    configForm.value.operatingCurrency
  );
  if (saveResult &&  saveResult.status === 1) {
    message.success('保存成功')
  }
};
</script>
