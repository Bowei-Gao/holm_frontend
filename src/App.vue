<script>
import axios from 'axios';

export default {
  data() {
    return {
      page: 0,
      result: {},
      locations: {},
      distances: [],
      result_add_algorithm: [],
      result_savings_algorithm: null,
      customers: [],
      result_assignment: null,
      input_assignment: {},
      depots: {},
      result_depotsCreate: null,
      result_customersCreate: null,
      result_depotsDelete: null,
      result_customersDelete: null
    }
  },
  methods: {
    async submitData() {
      const payload = {
        variable_costs_per_km: this.result.variable_costs_per_km,
        fixed_costs: this.locations.fixedCost,
        distances: this.distances // This should be dynamic based on your application's needs
      };

      axios.post('http://localhost:8080/api/strategic', payload)
          .then(response => {
            // Handle response here
            this.result_add_algorithm = response.data.content;
          })
          .catch(error => {
            // Handle error here
            console.error(error);
          });
    },
    async submitDataPlanning() {
      const payload = {
        loading_capacity: this.result.loading_capacity,
        deliveryQuantities: this.customers.deliveryQuantities,
        x: this.customers.x,
        y: this.customers.y // This should be dynamic based on your application's needs
      };

      axios.post('http://localhost:8080/api/planning', payload)
          .then(response => {
            // Handle response here
            this.result_savings_algorithm = response.data.content;
          })
          .catch(error => {
            // Handle error here
            console.error(error);
          });
    },
    async submitDataAssignment() {
      const payload = {
        distances: this.input_assignment.distances,
        inventory: this.input_assignment.inventory,
        demand: this.input_assignment.demand // This should be dynamic based on your application's needs
      };

      axios.post('http://localhost:8080/api/assignment', payload)
          .then(response => {
            // Handle response here
            this.result_assignment = response.data.content;
          })
          .catch(error => {
            // Handle error here
            console.error(error);
          });
    },
    async createDepots() {
      const payload = {
        names: this.depots.names,
        x: this.depots.x,
        y: this.depots.y,
        capacities: this.depots.capacity,
        fixed_costs: this.depots.fixedCost // This should be dynamic based on your application's needs
      };

      axios.post('http://localhost:8080/api/depotsCreate', payload)
          .then(response => {
            // Handle response here
            this.result_depotsCreate = response.data.content;
            alert('This is an alert from Vue.js!');
          })
          .catch(error => {
            // Handle error here
            console.error(error);
            alert('Create Failed!');
          });
    },
    async createCustomers() {
      const payload = {
        names: this.customers.names,
        x: this.customers.x,
        y: this.customers.y,
        demand: this.customers.demand // This should be dynamic based on your application's needs
      };

      axios.post('http://localhost:8080/api/customersCreate', payload)
          .then(response => {
            // Handle response here
            this.result_customersCreate = response.data.content;
            alert('This is an alert from Vue.js!');
          })
          .catch(error => {
            // Handle error here
            console.error(error);
            alert('Create Failed!');
          });
    },
    async deleteDepots() {
      const payload = {
        names: this.depots.names, // This should be dynamic based on your application's needs
        x: [],
        y: [],
        capacities: [],
        fixed_costs: [] // This should be dynamic based on your application's needs
      };

      axios.post('http://localhost:8080/api/depotsDelete', payload)
          .then(response => {
            // Handle response here
            this.result_depotsDelete = response.data.content;
            alert('This is an alert from Vue.js!');
          })
          .catch(error => {
            // Handle error here
            console.error(error);
            alert('Delete Failed!');
          });
    },
    async deleteCustomers() {
      const payload = {
        names: this.customers.names, // This should be dynamic based on your application's needs
        x: [],
        y: [],
        demand: [] // This should be dynamic based on your application's needs
      };

      axios.post('http://localhost:8080/api/customersDelete', payload)
          .then(response => {
            // Handle response here
            this.result_customersDelete = response.data.content;
            alert('This is an alert from Vue.js!');
          })
          .catch(error => {
            // Handle error here
            console.error(error);
            alert('Delete Failed!');
          });
    }
  }
}
</script>

<template>
  <zero v-if='page==0' @selected="page = $event"></zero>
  <one v-if='page==1' @home="page = 0" @continue="page += 1; result = $event;"></one>
  <two v-if='page==2' @home="page = 0" @continue="page += 1; locations = $event;" :number_of_locations="result.number_of_locations"></two>
  <three v-if="page==3" @home="page = 0" @start-add-algorithm="page += 1; distances = $event; submitData();" :number_of_locations="result.number_of_locations" :number_of_customers="result.number_of_customers"></three>
  <four v-if="page==4" @home="page = 0" :result_add_algorithm="result_add_algorithm"></four>
  <five v-if="page==5" @home="page = 0" @continue="page += 1; result = $event;" @start-planning="page = 7; input_assignment=$event; submitDataAssignment();"></five>
  <six v-if="page==6" @home="page = 0" @start-planning="page += 1; input_assignment=$event; submitDataAssignment();" :number_of_depots="result.number_of_depots" :number_of_customers="result.number_of_customers"></six>
  <seven v-if="page==7" @home="page = 0" :result_assignment="result_assignment"></seven>
  <eight v-if="page==8" @home="page = 0" @continue="page += 1; result = $event;"></eight>
  <nine v-if="page==9" @home="page = 0" @continue="page += 1; customers = $event;" :number_of_customers="result.number_of_customers"></nine>
  <ten v-if="page==10" @home="page = 0" @start-savings-algorithm="page += 1; submitDataPlanning();" :number_of_customers="result.number_of_customers"></ten>
  <eleven v-if="page==11" @home="page = 0" :result_savings_algorithm="result_savings_algorithm"></eleven>
  <twelve v-if='page==12' @home="page = 0" @continue="page += 1; result = $event;"></twelve>
  <thirteen v-if='page==13' @home="page = 0" @create-depots="page = 0; depots=$event; createDepots();" :number_of_depots="result.number_of_depots"></thirteen>
  <fourteen v-if='page==14' @home="page = 0" @continue="page += 1; result = $event;"></fourteen>
  <fifteen v-if='page==15' @home="page = 0" @create-customers="page = 0; customers=$event; createCustomers();" :number_of_customers="result.number_of_customers"></fifteen>
  <sixteen v-if='page==16' @home="page = 0" @continue="page += 1; result = $event;"></sixteen>
  <seventeen v-if='page==17' @home="page = 0" @delete-depots="page = 0; depots=$event; deleteDepots();" :number_of_depots="result.number_of_depots"></seventeen>
  <eighteen v-if='page==18' @home="page = 0" @continue="page += 1; result = $event;"></eighteen>
  <nineteen v-if='page==19' @home="page = 0" @delete-customers="page = 0; customers=$event; deleteCustomers();" :number_of_customers="result.number_of_customers"></nineteen>
</template>

<style>
</style>
