<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Chamados por Clientes</h2>
    <div class="bg-white rounded-lg p-4 shadow">
      <canvas ref="pieChartClient" class="w-full h-64"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: {
    clientData: Object,
  },
  data() {
    return {
      clientColors: {
        "Apple Inc.": "red",
        "Google": "blue",
        "Microsoft": "green",
        "Tesla": "orange",
        "SpaceX": "purple",
      },
    };
  },
  watch: {
    clientData: {
      immediate: true,
      handler: "createPieChart",
    },
  },
  methods: {
    createPieChart() {
      if (this.clientData && this.clientData.groupedByClient) {
        const groupedByClient = this.clientData.groupedByClient;
        const clientNames = Object.keys(groupedByClient);
        const clientCounts = clientNames.map((name) => groupedByClient[name].length);
        const backgroundColors = clientNames.map((name) => this.clientColors[name]);
        const ctx = this.$refs.pieChartClient.getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: clientNames,
            datasets: [
              {
                data: clientCounts,
                backgroundColor: backgroundColors,
              },
            ],
          },
        });
      }
    },
  },
};
</script>
