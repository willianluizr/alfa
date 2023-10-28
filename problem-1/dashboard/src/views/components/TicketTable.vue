<template>
  <div class="py-6 px-4">
    <h2 class="text-2xl font-semibold mb-4">Tabela de Tickets</h2>
    <div class="flex space-x-4 mb-4">
      <div class="flex items-center space-x-2">
        <label for="selectedMonth" class="font-semibold">Selecione o Mês:</label>
        <select v-model="selectedMonth" id="selectedMonth" class="border rounded p-2">
          <option value="">Todos</option>
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <label for="selectedYear" class="font-semibold">Selecione o Ano:</label>
        <select v-model="selectedYear" id="selectedYear" class="border rounded p-2">
          <option value="">Todos</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <label for="statusFilter" class="font-semibold">Filtrar por Status:</label>
        <select v-model="statusFilter" id="statusFilter" class="border rounded p-2">
          <option value="">Todos</option>
          <option value="aberto">Aberto</option>
          <option value="fechado">Fechado</option>
        </select>
      </div>
    </div>

    <table class="w-full border-collapse" aria-describedby="Tabela de Tickets">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-3">ID</th>
          <th class="p-3">Título</th>
          <th class="p-3">Cliente</th>
          <th class="p-3">Data de Abertura</th>
          <th class="p-3">Data de Encerramento</th>
          <th class="p-3">Módulo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in displayedTickets" :key="ticket.id" class="hover:bg-gray-100">
          <td class="p-3">{{ ticket.id }}</td>
          <td class="p-3">{{ ticket.title }}</td>
          <td class="p-3">{{ ticket.clientName }}</td>
          <td class="p-3">{{ ticket.opening_date }}</td>
          <td class="p-3">{{ ticket.closing_date }}</td>
          <td class="p-3">{{ ticket.moduleName }}</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 flex justify-between">
      <button @click="changePage(-1)" :disabled="currentPage === 1" class="p-2 bg-gray-200 rounded">
        Anterior
      </button>
      <span class="p-2">Página {{ currentPage }}</span>
      <button
        @click="changePage(1)"
        :disabled="currentPage * perPage >= flattenedTickets.length"
        class="p-2 bg-gray-200 rounded"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tickets: [],
      flattenedTickets: [],
      currentPage: 1,
      perPage: 5,
      selectedMonth: "",
      selectedYear: "",
      statusFilter: "",
    };
  },
  mounted() {
    this.loadTickets();
  },
  computed: {
    displayedTickets() {
      let filteredTickets = this.flattenedTickets;

      if (this.selectedMonth) {
        filteredTickets = filteredTickets.filter((ticket) => {
          const ticketMonth = new Date(ticket.opening_date).getUTCMonth() + 1;
          return ticketMonth === parseInt(this.selectedMonth);
        });
      }

      if (this.selectedYear) {
        filteredTickets = filteredTickets.filter((ticket) => {
          const ticketYear = new Date(ticket.opening_date).getUTCFullYear();
          return ticketYear === parseInt(this.selectedYear);
        });
      }

      if (this.statusFilter) {
        filteredTickets = filteredTickets.filter((ticket) => {
          if (this.statusFilter === "aberto") {
            return new Date(ticket.closing_date) > new Date();
          } else if (this.statusFilter === "fechado") {
            return new Date(ticket.closing_date) <= new Date();
          }
          return true;
        });
      }

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return filteredTickets.slice(start, end);
    },
  },
  methods: {
    loadTickets() {
      axios
        .get("http://localhost:3000/api/tickets/grouped")
        .then((response) => {
          this.flattenedTickets = this.flattenGroupedData(response.data);
        })
        .catch((error) => {
          console.error("Erro ao obter os tickets:", error);
        });
    },
    flattenGroupedData(groupedData) {
      const flattened = [];
      for (const clientName in groupedData.groupedByClient) {
        const clientTickets = groupedData.groupedByClient[clientName];
        for (const ticket of clientTickets) {
          flattened.push({
            id: ticket.id,
            title: ticket.title,
            clientName,
            opening_date: ticket.opening_date,
            closing_date: ticket.closing_date,
            moduleName: this.getModuleName(groupedData, ticket.fk_id_module),
          });
        }
      }
      return flattened;
    },
    applyFilters() {
      this.loadTickets();
    },
    getModuleName(groupedData, moduleId) {
      for (const moduleName in groupedData.groupedByModule) {
        if (
          groupedData.groupedByModule[moduleName].some(
            (ticket) => ticket.fk_id_module === moduleId
          )
        ) {
          return moduleName;
        }
      }
      return "";
    },
    changePage(offset) {
      this.currentPage += offset;
    },
  },
};
</script>

<style>
.filter {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ccc;
  text-align: left;
}

th,
td {
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
