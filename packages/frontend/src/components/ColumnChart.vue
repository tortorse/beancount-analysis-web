<template>
  <div ref="chartRef"></div>
</template>
<script setup lang="ts">
import { Column } from "@antv/g2plot";
import { onMounted, PropType, ref } from "vue";

const props = defineProps({
  data: {
    type: Array as PropType<Record<string, any>[]>, // explicitly typed as an array of objects with string keys and any values
    required: true,
  },
});
const chartRef = ref<HTMLElement | null>(null)
onMounted(() => {
  const colum = new Column(chartRef.value!, {
    data: props.data,
    xField: "month",
    yField: "amount",
  });
  colum.render();
});
</script>
