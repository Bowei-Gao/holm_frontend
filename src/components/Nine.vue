<script>
export default {
    props: ['number_of_customers'],
    emits: ['continue', 'home'],
    data() {
        return {
        page: 0,
        result: {},
        customers: {
            x: [],
            y: [],
            deliveryQuantities: [],
          pickUpQuantities: []
        },
        matrix: []
    }
  },
  methods: {
    handleDeliveryQuantitiesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.customers.deliveryQuantities = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },
    handlePickUpQuantitiesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.customers.pickUpQuantities = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },
    handleCoordinatesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Parse the CSV content into a 2D array
        const lines = content.split('\n');
        this.matrix = lines.map(line =>
            line.split(',').map(item => +item.trim()).filter(item => !isNaN(item))
        );
        this.customers.x = this.matrix.map(pair => pair[0]);
        this.customers.y = this.matrix.map(pair => pair[1]);
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
            <table class="table input-group" v-if="number_of_customers>0">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th class="text-center">Delivery Quantity</th>
                        <th class="text-center">Pickup Quantity</th>
                        <th class="text-center">X-coordinates</th>
                        <th class="text-center">Y-coordinates</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_customers).keys()]" :key="rowIndex">
                        <td class="text-center">Customer {{ rowIndex + 1 }}</td>
                        <td>
                            <select class="form-select" aria-label=".form-select example">
                                <option selected>Select a Customer</option>
                                <option value="1">Customer 4711</option>
                                <option value="2">Customer 4396</option>
                                <option value="3">Customer 3402</option>
                            </select>
                        </td>
                        <td><input type="number" name='delivery_quantity'  placeholder='' class="form-control" v-model="customers.deliveryQuantities[rowIndex]"/></td>
                        <td><input type="number" name='pickup_quantity'  placeholder='' class="form-control" v-model="customers.pickUpQuantities[rowIndex]"/></td>
                        <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="customers.x[rowIndex]"/></td>
                        <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="customers.y[rowIndex]"/></td>
                    </tr>
                </tbody>
            </table>

          <div v-if="number_of_customers===0">
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the delivery quantities file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handleDeliveryQuantitiesFileUpload">
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the pick up quantities file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handlePickUpQuantitiesFileUpload">
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the coordinates file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handleCoordinatesFileUpload">
            </div>
          </div>
          <br>
          <div class="well"><h5>Customers that were assigned to the chosen depot in the tactical planning.</h5></div>

            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('continue', customers)">Continue</button>
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