<script>
export default {
  emits: ['continue', 'startPlanning'],
  data() {
    return {
      result: {
        number_of_depots: 0,
        number_of_customers: 0
      }
    }
  }
}
</script>


<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Basic Information</h1>
            <h3 class="text-center">Assignment</h3>
        </div>
    </div>
    
    <div class="container">
      <label for="formFile" class="form-label">Please input basic information.</label>
        <form>
            <div class="input-group">
                <span class="input-group-addon">Number of Depots: </span>
                <input id="number_of_depots" type="number" class="form-control" name="number_of_depots" v-model="result.number_of_depots">
            </div>
            <br>
            <div class="input-group">
                <span class="input-group-addon">Number of Customers: </span>
                <input id="number_of_customers" type="number" class="form-control" name="number_of_customers" v-model="result.number_of_customers">
            </div>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('continue', result)">Continue</button>
            </div>
        </form>
    </div>
</template>