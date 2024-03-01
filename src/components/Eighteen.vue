<script>
export default {
  emits: ['continue', 'home'],
  data() {
    return {
      result: {
        number_of_customers: 0,
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="text-center">Basic Information</h1>
      <h3 class="text-center">Delete Customers</h3>
    </div>
  </div>

  <div class="container">
    <label for="formFile" class="form-label">Please input basic information.</label>
    <form>
      <div class="input-group">
        <span class="input-group-addon">Number of customers: </span>
        <input id="number_of_customers" type="number" class="form-control" name="number_of_customers" v-model="result.number_of_customers">
      </div>
      <br>
      <div class="well"><h5>If you will upload files as input, do not enter anything and press "continue".</h5></div>
      <br>
      <div class="input-group pull-right">
        <button type="submit" class="btn pull-right" @click="$emit('continue', result)">Continue</button>
      </div>
    </form>
  </div>
  <div class="container">
    <form>
      <br>
      <div class="input-group pull-right">
        <button type="submit" class="btn pull-right" @click="$emit('home')">Home</button>
      </div>
    </form>
  </div>
</template>