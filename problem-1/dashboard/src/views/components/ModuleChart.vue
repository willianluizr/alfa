<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Chamados por Módulos</h2>
    <div class="bg-white rounded-lg p-4 shadow">
      <canvas ref="pieChartModule" class="w-full h-64"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: {
    moduleData: Object,
  },
  data() {
    return {
      moduleColors: {
        "Financeiro": "red",
        "Vendas": "blue",
        "Expedição": "orange",
        "Foguetes": "purple",
      },
    };
  },
  watch: {
    moduleData: {
      immediate: true,
      handler: "createPieChartModule",
    },
  },
  methods: {
    createPieChartModule() {
      if (this.moduleData && this.moduleData.groupedByModule) {
        const groupedByModule = this.moduleData.groupedByModule;
        const moduleNames = Object.keys(groupedByModule);
        const moduleCounts = moduleNames.map((name) => groupedByModule[name].length);
        const backgroundColors = moduleNames.map((name) => this.moduleColors[name]);
        const ctx = this.$refs.pieChartModule.getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: moduleNames,
            datasets: [
              {
                data: moduleCounts,
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
