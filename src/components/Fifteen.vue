<script>
export default {
  props: ['number_of_customers'],
  emits: ['home'],
  data() {
    return {
      page: 0,
      result: {},
      customers: {
        names: [],
        x: [],
        y: [],
        demand: []
      },
      customersFile: Array.from({ length: this.number_of_customers }, () => Array(4).fill(0))
    }
  },
  methods: {
    handleCustomersFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Parse the CSV content into a 2D array
        const lines = content.split('\n');
        this.customersFile = lines.map(line =>
            line.split(',').map(item => +item.trim()).filter(item => !isNaN(item))
        );
      };
      reader.readAsText(file);

      this.customersFile.forEach(innerArray => {
        // Assuming each innerArray has exactly 5 elements based on your initialization
        this.customers.names.push(innerArray[0]);
        this.customers.x.push(innerArray[1]);
        this.customers.y.push(innerArray[2]);
        this.customers.demand.push(innerArray[3]);
      });
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="text-center">New Customers</h1>
      <h3 class="text-center">Create Customers</h3>
    </div>
  </div>

  <div class="container">
    <form>
      <table class="table input-group" v-if="number_of_customers>0">
        <thead>
        <tr>
          <th></th>
          <th class="text-center">Names of Customers</th>
          <th class="text-center">X-coordinates of Customers</th>
          <th class="text-center">Y-coordinates of Customers</th>
          <th class="text-center">Demands of Customers</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="rowIndex in [...Array(number_of_customers).keys()]" :key="rowIndex">
          <td>Customer {{ rowIndex + 1 }}</td>
          <td><input type="number" name='names'  placeholder='' class="form-control" v-model="customers.names[rowIndex]"/></td>
          <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="customers.x[rowIndex]"/></td>
          <td><input type="number" name='Y-coordinates'  placeholder='' class="form-control" v-model="customers.y[rowIndex]"/></td>
          <td><input type="number" name='demands'  placeholder='' class="form-control" v-model="customers.demand[rowIndex]"/></td>
        </tr>
        </tbody>
      </table>
      <div class="mb-3" v-if="number_of_customers===0">
        <label for="formFile" class="form-label">Please input the customers file.</label>
        <input class="form-control" type="file" id="formFile"  @change="handleCustomersFileUpload">
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