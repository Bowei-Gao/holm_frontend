<script>
export default {
    props: ['number_of_customers'],
    emits: ['startSavingsAlgorithm', 'home'],
  data() {
    return {
      distances: Array.from({ length: (this.number_of_customers + 1) }, () => Array(this.number_of_customers + 1).fill(null))
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
        this.distances = lines.map(line =>
            line.split(',').map(item => +item.trim()).filter(item => !isNaN(item))
        );
      };
      reader.readAsText(file);
    }
  }
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Distances</h1>
            <h3 class="text-center">Vehicle Routing</h3>
        </div>
    </div>
    
    <div class="container">
        <form>
            <table class="table input-group" v-if="number_of_customers>0">
                <thead>
                    <tr>
                        <th></th>
                        <th>Depot</th>
                        <th class="text-center" v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex">Customer {{ colIndex + 1 }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Depot</td>
                        <td><input v-model="distances[0][0]" type="number" name='customer_0' class="form-control"/></td>
                        <td v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex"><input v-model="distances[0][colIndex + 1]" type="number" name='customer_0' class="form-control"/></td>
                    </tr>
                    <tr v-for="rowIndex in [...Array(number_of_customers).keys()]" :key="rowIndex">
                        <td>Customer {{ rowIndex + 1 }}</td>
                        <td><input type="number" name='customer_0' class="form-control" disabled/></td>
                        <td v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex"><input v-model="distances[rowIndex + 1][colIndex + 1]" type="number" name='customer_0' class="form-control" :disabled="colIndex < rowIndex"/></td>
                    </tr>
                </tbody>
            </table>
          <div v-if="number_of_customers===0">
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the distances file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handleDistancesFileUpload">
            </div>
          </div>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('startSavingsAlgorithm', distances)">Start Savings-Algorithm</button>
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