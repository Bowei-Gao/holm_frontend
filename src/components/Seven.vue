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
    <h3 class="text-center">{{ result_assignment }}</h3>
  </div>

    <div class="container">
        <form>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('home')">Home</button>
            </div>
        </form>
    </div>
</template>