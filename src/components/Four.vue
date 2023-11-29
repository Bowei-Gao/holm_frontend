<script>
export default {
    props: ['result_add_algorithm'],
    emits: ['home']
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Result</h1>
            <h3 class="text-center">Location Planning</h3>
        </div>
    </div>

  <div class="container">
      <h3 class="text-center">{{ result_add_algorithm }}</h3>
  </div>

  <div class="container">
    <span class="d-inline-block mr-2" v-for="(item, index) in result_add_algorithm" :key="index">
      {{ item }}<span v-if="index < result_add_algorithm.length - 1">,</span>
    </span>
  </div>

    <div class="container">
        <form>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('home')">Home</button>
            </div>
        </form>
    </div>
</template>