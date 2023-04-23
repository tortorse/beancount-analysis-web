<template>
  <div ref="chartRef"></div>
</template>
<script setup lang="ts">
import { Pie } from "@antv/g2plot";
import { onMounted, PropType, ref } from "vue";

const props = defineProps({
  data: {
    type: Array as PropType<Record<string, any>[]>, // explicitly typed as an array of objects with string keys and any values
    required: true,
  },
});
const chartRef = ref<HTMLElement | null>(null);
onMounted(() => {
  const colum = new Pie(chartRef.value!, {
    appendPadding: 10,
    data: props.data,
    colorField: "account",
    angleField: "amount",
    innerRadius: 0.5,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    statistic: {
      content: {
        formatter: (datum, data) => {
          return data ? data.reduce((r, d) => r + d.amount, 0).toFixed(2) : "0";
        },
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
  });
  colum.render();
});
</script>
