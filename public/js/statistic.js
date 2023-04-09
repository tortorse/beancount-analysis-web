async function getMonthData(year, month) {
  try {
    const res = await fetch(`/api/month?year=${year}&month=${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "success") {
      return data.data;
    } else {
      console.error(data.status);
    }
  } catch (error) {
    console.error(error);
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const data = await getMonthData(2023, 2);
  const { Pie } = G2Plot;
  const piePlot = new Pie("container", {
    appendPadding: 10,
    data,
    angleField: "amount",
    colorField: "account",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
    legend: { flipPage: false },
  });

  piePlot.render();
});
