<script>
export default {
    props: ['result_assignment'],
    emits: ['home']
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Result</h1>
            <h3 class="text-center">Assignment</h3>
        </div>
    </div>

  <div class="container">
    <div class="jumbotron">
      <h2 class="text-center">Assignments recommendation:</h2>
      <div v-for="(row, index) in result_assignment" :key="index">
        <h2 class="text-center">assignment {{ index }}: <span v-for="(item, j) in row" :key="j">
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