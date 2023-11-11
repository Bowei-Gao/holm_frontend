<script>
export default {
  emits: ['continue'],
  data() {
    return {
      result: {
        number_of_locations: 0,
        number_of_customers: 0,
        variable_costs_per_km: 0
      }
    }
  }
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Basic Information</h1>
            <h3 class="text-center">Location Planning</h3>
        </div>
    </div>
    
    <div class="container">
        <form>
            <div class="input-group">
                <span class="input-group-addon">Number of Locations: </span>
                <input id="number_of_locations" type="number" class="form-control" name="number_of_locations" v-model="result.number_of_locations">
            </div>
            <br>
            <div class="input-group">
                <span class="input-group-addon">Number of Customers: </span>
                <input id="number_of_customers" type="number" class="form-control" name="number_of_customers" v-model="result.number_of_customers">
            </div>
            <br>
            <div class="input-group">
                <span class="input-group-addon">Variable Costs per km: </span>
                <input id="variable_costs_per_km" type="number" class="form-control" name="variable_costs_per_km" v-model="result.variable_costs_per_km">
            </div>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('continue', result)">Continue</button>
            </div>
        </form>
        </div>
</template>