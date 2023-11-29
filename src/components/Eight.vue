<script>
export default {
  emits: ['continue'],
  data() {
    return {
      result: {
        depot: 0,
        number_of_customers: 0,
        loading_capacity: 0
      }
    }
  }
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Basic Information</h1>
            <h3 class="text-center">Vehicle Routing</h3>
        </div>
    </div>
    
    <div class="container">
      <label for="formFile" class="form-label">Please input basic information.</label>
        <form>
            <div class="input-group">
                <select class="form-select" aria-label=".form-select example" v-model="result.depot">
                    <option selected>Select a Depot</option>
                    <option value="1">Depot ABC</option>
                    <option value="2">Depot WDF</option>
                    <option value="3">Depot ZGF</option>
                </select>
            </div>
            <br>
            <div class="input-group">
                <span class="input-group-addon">Number of Customers: </span>
                <input id="number_of_customers" type="number" class="form-control" name="number_of_customers" v-model="result.number_of_customers">
            </div>
            <br>
            <div class="input-group">
                <span class="input-group-addon">Loading Capacity: </span>
                <input id="loading_capacity" type="number" class="form-control" name="loading_capacity" v-model="result.loading_capacity">
            </div>
          <br>
          <div class="well"><h5>If you will upload files as input, only enter loading capacity and press "continue".</h5></div>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('continue', result)">Continue</button>
            </div>
        </form>
    </div>
</template>