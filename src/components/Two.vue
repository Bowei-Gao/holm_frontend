<script>
export default {
    props: ['number_of_locations'],
    emits: ['continue'],
    data() {
        return {
            page: 0,
            result: {},
            locations: {
                x: [],
                y: [],
                fixedCost: []
            }
        }
    },
  methods: {
    handleFixedCostsFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.locations.fixedCost = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    }
  }
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Potential Locations</h1>
            <h3 class="text-center">Location Planning</h3>
        </div>
    </div>
    
    <div class="container">
        <form>
            <table class="table input-group" v-if="number_of_locations>0">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">X-coordinates of Potential Locations</th>
                        <th class="text-center">Y-coordinates of Potential Locations</th>
                        <th class="text-center">Fixed Costs of Potential Locations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_locations).keys()]" :key="rowIndex">
                        <td>Location {{ rowIndex }}</td>
                        <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="locations.x[rowIndex]"/></td>
                        <td><input type="number" name='Y-coordinates'  placeholder='' class="form-control" v-model="locations.y[rowIndex]"/></td>
                        <td><input type="number" name='fixed_costs'  placeholder='' class="form-control" v-model="locations.fixedCost[rowIndex]"/></td>
                    </tr>
                </tbody>
            </table>
          <div v-if="number_of_locations===0">
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the fixed costs file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handleFixedCostsFileUpload">
            </div>
          </div>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('continue', locations)">Continue</button>
            </div>
        </form>
    </div>
</template>