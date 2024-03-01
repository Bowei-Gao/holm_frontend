<script>
export default {
  props: ['number_of_depots'],
  emits: ['deleteDepots', 'home'],
  data() {
    return {
      page: 0,
      result: {},
      depots: {
        names: []
      }
    }
  },
  methods: {
    handleNamesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.depots.names = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="text-center">Depot Names</h1>
      <h3 class="text-center">Delete Depots</h3>
    </div>
  </div>

  <div class="container">
    <form>
      <table class="table input-group" v-if="number_of_depots>0">
        <thead>
        <tr>
          <th></th>
          <th class="text-center">Names of Depots</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="rowIndex in [...Array(number_of_depots).keys()]" :key="rowIndex">
          <td>Location {{ rowIndex + 1 }}</td>
          <td><input type="number" name='names'  placeholder='' class="form-control" v-model="depots.names[rowIndex]"/></td>
        </tr>
        </tbody>
      </table>
      <div v-if="number_of_depots===0">
        <div class="mb-3">
          <label for="formFile" class="form-label">Please input the depot names file.</label>
          <input class="form-control" type="file" id="formFile"  @change="handleNamesFileUpload">
        </div>
      </div>
      <br>
      <div class="input-group pull-right">
        <button type="submit" class="btn pull-right" @click="$emit('deleteDepots', depots)">Delete Depots</button>
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