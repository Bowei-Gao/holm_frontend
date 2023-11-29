<script>
export default {
  emits: ['continue', 'startPlanning'],
  data() {
    return {
      result: {
        number_of_depots: 0,
        number_of_customers: 0
      },
      input_assignment: {
        distances: [],
        inventory: [],
        demand: []
      }
    }
  },
  methods: {
    handleDistancesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Parse the CSV content into a 2D array
        const lines = content.split('\n');
        this.input_assignment.distances = lines.map(line =>
            line.split(',').map(item => +item.trim()).filter(item => !isNaN(item))
        );
      };
      reader.readAsText(file);
    },
    handleInventoryFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.input_assignment.inventory = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },
    handleDemandFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.input_assignment.demand = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
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

  <div class="container">
    <div class="mb-3">
      <label for="formFile" class="form-label">Please input the distances file.</label>
      <input class="form-control" type="file" id="formFile"  @change="handleDistancesFileUpload">
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label">Please input the inventory capacities file.</label>
      <input class="form-control" type="file" id="formFile"  @change="handleInventoryFileUpload">
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label">Please input the demands file.</label>
      <input class="form-control" type="file" id="formFile"  @change="handleDemandFileUpload">
    </div>
    <br>
    <div class="input-group pull-right">
      <button type="submit" class="btn pull-right" @click="$emit('startPlanning', input_assignment)">Start Planning</button>
    </div>
  </div>
</template>