<script>
export default {
    props: ['number_of_customers', 'all_customers'],
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
            matrix: [],
            fileOption: this.number_of_customers,
        }
    },
    methods: {
    /*handleDeliveryQuantitiesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.customers.deliveryQuantities = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },*/
        handleDeliveryQuantitiesFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;  // Ensure a file is actually selected

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});

                // Assuming the data is in the first sheet
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convert the sheet to a 2D array
                const json = XLSX.utils.sheet_to_json(worksheet, {header: 1});

                // Assuming you want to combine all rows' first column into one array of rates
                this.customers.deliveryQuantities = json.map(row => +row[0]).filter(item => !isNaN(item));
            };

            reader.onerror = () => {
                console.error('Error reading file');
            };

            // Read the file as an array buffer
            reader.readAsArrayBuffer(file);
        },
    /*handlePickUpQuantitiesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.customers.pickUpQuantities = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },*/
        handlePickUpQuantitiesFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;  // Ensure a file is actually selected

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});

                // Assuming the data is in the first sheet
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convert the sheet to a 2D array
                const json = XLSX.utils.sheet_to_json(worksheet, {header: 1});

                // Assuming you want to combine all rows' first column into one array of rates
                this.customers.pickUpQuantities = json.map(row => +row[0]).filter(item => !isNaN(item));
            };

            reader.onerror = () => {
                console.error('Error reading file');
            };

            // Read the file as an array buffer
            reader.readAsArrayBuffer(file);
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
            <h3 class="text-center">Vehicle Routing</h3>
        </div>
    </div>

    <div class="container" v-if="number_of_customers>0">
        <form>
            <label>
            <input type="radio" :value="number_of_customers" v-model="fileOption">
                Manual Input
            </label>
            <label>
            <input type="radio" :value="0" v-model="fileOption">
                File Input
            </label>
        </form>
    </div>
    
    <div class="container">
        <form>
            <table class="table input-group" v-if="fileOption>0">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th class="text-center">Delivery Quantity</th>
                        <th class="text-center">Pickup Quantity</th>
                        <th class="text-center" v-show="false">X-coordinates</th>
                        <th class="text-center" v-show="false">Y-coordinates</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_customers).keys()]" :key="rowIndex">
                        <td class="text-center">Customer {{ rowIndex + 1 }}</td>
                        <td>
                            <select class="form-select" aria-label=".form-select example">
                                <option selected value="">Select a Customer</option>
                              <option v-for="c in this.all_customers" :key="c.names" :value="c.names">{{ c.names }}</option>
                            </select>
                        </td>
                        <td><input type="number" name='delivery_quantity'  placeholder='' class="form-control" v-model="customers.deliveryQuantities[rowIndex]"/></td>
                        <td><input type="number" name='pickup_quantity'  placeholder='' class="form-control" v-model="customers.pickUpQuantities[rowIndex]"/></td>
                        <td v-show="false"><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="customers.x[rowIndex]"/></td>
                        <td v-show="false"><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="customers.y[rowIndex]"/></td>
                    </tr>
                </tbody>
            </table>

          <div v-if="fileOption===0">
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the delivery quantities file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handleDeliveryQuantitiesFileUpload">
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the pick up quantities file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handlePickUpQuantitiesFileUpload">
            </div>
            <div class="mb-3" v-show="false">
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