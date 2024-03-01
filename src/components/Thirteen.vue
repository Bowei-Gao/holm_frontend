<script>
export default {
  props: ['number_of_depots'],
  emits: ['createDepots', 'home'],
  data() {
    return {
      page: 0,
      result: {},
      depots: {
        names: [],
        x: [],
        y: [],
        capacity: [],
        fixedCost: []
      },
      depotsFile: Array.from({ length: this.number_of_depots }, () => Array(5).fill(0))
    }
  },
  methods: {
    handleDepotsFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Parse the CSV content into a 2D array
        const lines = content.split('\n');
        this.depotsFile = lines.map(line =>
            line.split(',').map(item => +item.trim()).filter(item => !isNaN(item))
        );
      };
      reader.readAsText(file);

      this.depotsFile.forEach(innerArray => {
        // Assuming each innerArray has exactly 5 elements based on your initialization
        this.depots.names.push(innerArray[0]);
        this.depots.x.push(innerArray[1]);
        this.depots.y.push(innerArray[2]);
        this.depots.capacity.push(innerArray[3]);
        this.depots.fixedCost.push(innerArray[4]);
      });
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="text-center">New Depots</h1>
      <h3 class="text-center">Create Depots</h3>
    </div>
  </div>

  <div class="container">
    <form>
      <table class="table input-group" v-if="number_of_depots>0">
        <thead>
        <tr>
          <th></th>
          <th class="text-center">Names of Depots</th>
          <th class="text-center">X-coordinates of Depots</th>
          <th class="text-center">Y-coordinates of Depots</th>
          <th class="text-center">Capacities of Depots</th>
          <th class="text-center">Fixed Costs of Depots</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="rowIndex in [...Array(number_of_depots).keys()]" :key="rowIndex">
          <td>Location {{ rowIndex + 1 }}</td>
          <td><input type="number" name='names'  placeholder='' class="form-control" v-model="depots.names[rowIndex]"/></td>
          <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="depots.x[rowIndex]"/></td>
          <td><input type="number" name='Y-coordinates'  placeholder='' class="form-control" v-model="depots.y[rowIndex]"/></td>
          <td><input type="number" name='capacities'  placeholder='' class="form-control" v-model="depots.capacity[rowIndex]"/></td>
          <td><input type="number" name='fixed_costs'  placeholder='' class="form-control" v-model="depots.fixedCost[rowIndex]"/></td>
        </tr>
        </tbody>
      </table>
      <div class="mb-3" v-if="number_of_depots===0">
        <label for="formFile" class="form-label">Please input the depots file.</label>
        <input class="form-control" type="file" id="formFile"  @change="handleDepotsFileUpload">
      </div>
      <br>
      <div class="input-group pull-right">
        <button type="submit" class="btn pull-right" @click="$emit('createDepots', depots)">Create Depots</button>
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