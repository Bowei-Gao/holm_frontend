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
      input_assignment: {}
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
    }
  }
}
</script>

<template>
  <zero v-if='page==0' @selected="page = $event"></zero>
  <one v-if='page==1' @continue="page += 1; result = $event;"></one>
  <two v-if='page==2' @continue="page += 1; locations = $event;" :number_of_locations="result.number_of_locations"></two>
  <three v-if="page==3" @start-add-algorithm="page += 1; distances = $event; submitData();" :number_of_locations="result.number_of_locations" :number_of_customers="result.number_of_customers"></three>
  <four v-if="page==4" @home="page = 0" :result_add_algorithm="result_add_algorithm"></four>
  <five v-if="page==5" @continue="page += 1; result = $event;" @start-planning="page = 7; input_assignment=$event; submitDataAssignment();"></five>
  <six v-if="page==6" @start-planning="page += 1; input_assignment=$event; submitDataAssignment();" :number_of_depots="result.number_of_depots" :number_of_customers="result.number_of_customers"></six>
  <seven v-if="page==7" @home="page = 0" :result_assignment="result_assignment"></seven>
  <eight v-if="page==8" @continue="page += 1; result = $event;"></eight>
  <nine v-if="page==9" @continue="page += 1; customers = $event;" :number_of_customers="result.number_of_customers"></nine>
  <ten v-if="page==10" @start-savings-algorithm="page += 1; submitDataPlanning();" :number_of_customers="result.number_of_customers"></ten>
  <eleven v-if="page==11" @home="page = 0" :result_savings_algorithm="result_savings_algorithm"></eleven>
</template>

<style>
</style>
