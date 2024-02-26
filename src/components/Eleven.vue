<script>
export default {
    props: ['result_savings_algorithm'],
    emits: ['home'],
  data() {
    return {
      result: []
    }
  }
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Result</h1>
            <h3 class="text-center">Vehicle Routing</h3>
        </div>
    </div>

  <div class="container">
    <div class="jumbotron">
      <h2 class="text-center">Routes recommendation:</h2>
        <div v-for="(row, index) in result_savings_algorithm" :key="index">
          <h2 class="text-center">route {{ index + 1 }}: <span v-for="(item, j) in row" :key="j">
            {{ item }}<span v-if="j < row.length - 1">, </span>
          </span></h2>
        </div>
    </div>
  </div>

    <div class="container">
        <form>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('home')">Home</button>
            </div>
        </form>
    </div>
</template>