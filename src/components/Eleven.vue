<script>
export default {
    props: ['result_savings_algorithm'],
    emits: ['home'],
  data() {
    return {
      result: [0, 1, 2, 3, 4]
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
        <h3 class="text-center">{{ result_savings_algorithm }}</h3>
    </div>

  <div class="container">
    <div class="jumbotron">
      <h2 class="text-center">Locations recommendation: <span v-for="(item, index) in result" :key="index">
      {{ item }}<span v-if="index < result.length - 1">, </span>
      </span></h2></div>
  </div>

    <div class="container">
        <form>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('home')">Home</button>
            </div>
        </form>
    </div>
</template>