<script>
export default {
  props: ['number_of_depots'],
  emits: ['home'],
  data() {
    return {
      page: 0,
      result: {},
      depots: {
        names: []
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="text-center">Depot Names</h1>
      <h3 class="text-center">Delete Depots</h3>
    </div>
  </div>

  <div class="container">
    <form>
      <table class="table input-group" v-if="number_of_depots>0">
        <thead>
        <tr>
          <th></th>
          <th class="text-center">Names of Depots</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="rowIndex in [...Array(number_of_depots).keys()]" :key="rowIndex">
          <td>Location {{ rowIndex + 1 }}</td>
          <td><input type="number" name='names'  placeholder='' class="form-control" v-model="depots.names[rowIndex]"/></td>
        </tr>
        </tbody>
      </table>
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