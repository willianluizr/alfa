<template>
  <v-app>
    <v-main>
      <div class="max-w-screen-xl mx-auto mb-10">
        <div class="flex justify-between">
          <div class="w-4/12 p-2">
            <ClientChart :clientData="getGroupedNames" />
          </div>
          <div class="w-4/12 p-2">
            <ModuleChart :moduleData="getGroupedNames" />
          </div>
        </div>
      </div>
      <div class="max-w-screen-xl mx-auto">
        <TicketTable />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import ClientChart from './components/ClientChart.vue';
import ModuleChart from './components/ModuleChart.vue';
import TicketTable from './components/TicketTable.vue';

export default {
  components: {
    ClientChart,
    ModuleChart,
    TicketTable
  },
  data() {
    return {
      grouped: {},
    };
  },
  computed: {
    getGroupedNames() {
      return this.grouped;
    }
  },
  mounted() {
    this.fetchGroupedData();
  },
  methods: {
    fetchGroupedData() {
      axios.get('http://localhost:3000/api/tickets/grouped')
        .then((response) => {
          this.grouped = response.data;
        })
        .catch((error) => {
          console.error('Erro ao obter dados agrupados:', error);
        });
    }
  }
};
</script>
