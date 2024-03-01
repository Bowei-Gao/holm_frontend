<script>
export default {
  emits: ['selected']
}
</script>

<template>
    <div class="container">
      <div class="jumbotron">
        <h1 class="text-center">Menu</h1>
      </div>
    </div>
    
    <div class="container">
      <button type="button" class="btn btn-primary btn-block" @click="$emit('selected', 1)">
        <h1>Location Planning</h1>
        (Strategic Planning)
      </button>
      <button type="button" class="btn btn btn-block" @click="$emit('selected', 5)">
        <h1>Assignment of Customers</h1>
        (Tactical Planning)
      </button>
      <button type="button" class="btn btn-danger btn-block" @click="$emit('selected', 8)">
        <h1>Vehicle Planning</h1>
        (Operational Planning)
      </button>
    
      <br>
    
      <div class="btn-group-vertical pull-left">
        <button type="button" class="btn btn-primary" @click="$emit('selected', 12)">Create Depot</button>
        <button type="button" class="btn btn-primary">Delete Depot</button>
      </div>
      <div class="btn-group-vertical pull-right">
        <button type="button" class="btn btn-primary" @click="$emit('selected', 14)">Create Customer</button>
        <button type="button" class="btn btn-primary">Delete Customer</button>
      </div>
      
    </div>
</template>