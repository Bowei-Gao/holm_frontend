<script>
export default {
    props: ['number_of_depots', 'number_of_customers'],
    emits: ['startPlanning'],
  data() {
    return {
      input_assignment: {
        distances: Array.from({ length: this.number_of_depots }, () => Array(this.number_of_customers).fill(0)),
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
            <h1 class="text-center">Additional Information</h1>
            <h3 class="text-center">Assignment</h3>
        </div>
    </div>
    
    <div class="container">
        <form>
            <table class="table input-group" v-if="number_of_depots>0">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center" v-for="columnIndex in [...Array(number_of_customers).keys()]" :key="columnIndex">
                            <select class="form-select" aria-label=".form-select example">
                                <option selected>Select a Customer</option>
                                <option value="1">Customer 4711</option>
                                <option value="2">Customer 4396</option>
                                <option value="3">Customer 3402</option>
                            </select>
                        </th>
                        <th class="text-center">Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_depots).keys()]" :key="rowIndex">
                        <td>
                            <select class="form-select" aria-label=".form-select example">
                                <option selected>Select a Depot</option>
                                <option value="1">Depot ABC</option>
                                <option value="2">Depot WDF</option>
                                <option value="3">Depot ZGF</option>
                            </select>
                        </td>
                        <td v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex"><input type="number" v-model="input_assignment.distances[rowIndex][colIndex]" name='customer_0' class="form-control"/></td>
                        <td><input type="number" v-model="input_assignment.inventory[rowIndex]" name='capacity'  placeholder='' class="form-control"/></td>
                    </tr>
                    <tr>
                        <td class="text-center">Demand</td>
                        <td v-for="cIndex in [...Array(number_of_customers).keys()]" :key="cIndex"><input type="number" v-model="input_assignment.demand[cIndex]" name='demand_0' class="form-control"/></td>
                    </tr>
                </tbody>
            </table>
          <div v-if="number_of_depots===0">
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
          </div>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('startPlanning', input_assignment)">Start Planning</button>
            </div>
        </form>
    </div>
</template>