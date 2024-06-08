<script>
export default {
    props: ['number_of_locations', 'number_of_customers', 'all_customers'],
    emits: ['startAddAlgorithm', 'home'],
    data() {
        return {
            page: 0,
            result: {},
            distances: Array.from({ length: this.number_of_locations }, () => Array(this.number_of_customers).fill(0)),
            variable_cost_rates: [],
            weightings: [],
            input_distances: {
                distances: Array.from({ length: this.number_of_locations }, () => Array(this.number_of_customers).fill(0)),
                variable_cost_rates: Array(this.number_of_customers).fill(1),
                weightings: Array(this.number_of_customers).fill(1),
            },
            fileOption: this.number_of_locations,
        }
    },
    methods: {
    /*handleDistancesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Parse the CSV content into a 2D array
        const lines = content.split('\n');
        this.input_distances.distances = lines.map(line =>
            line.split(',').map(item => +item.trim()).filter(item => !isNaN(item))
        );
      };
      reader.readAsText(file);
    },*/
    handleDistancesFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;  // Ensure a file is selected

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});

            // Assuming the data is in the first sheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convert the sheet to a 2D array
            const json = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            this.input_distances.distances = json.map(row => 
                row.map(item => +item).filter(item => !isNaN(item))
            );
        };

        reader.onerror = () => {
            console.error('Error reading file');
        };

        // Read the file as an array buffer
        reader.readAsArrayBuffer(file);
    },
    /*handleVariableCostRatesFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.input_distances.variable_cost_rates = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },*/
    handleVariableCostRatesFileUpload(event) {
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
            this.input_distances.variable_cost_rates = json.map(row => +row[0]).filter(item => !isNaN(item));
        };

        reader.onerror = () => {
            console.error('Error reading file');
        };

        // Read the file as an array buffer
        reader.readAsArrayBuffer(file);
    },
    /*handleWeightingsFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.input_distances.weightings = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },*/
    handleWeightingsFileUpload(event) {
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
            this.input_distances.weightings = json.map(row => +row[0]).filter(item => !isNaN(item));
        };

        reader.onerror = () => {
            console.error('Error reading file');
        };

        // Read the file as an array buffer
        reader.readAsArrayBuffer(file);
    },
    handleCustomerChange(event, index) {
        // this.selectedCustomers[index] = event.target.value;
        // console.log(`Customer selected in column ${index}: ${event.target.value}`);
        // Additional actions here
        alert(index);
        alert(event.target.value);

    }
    },
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Distances</h1>
            <h3 class="text-center">Location Planning</h3>
        </div>
    </div>

    <div class="container" v-if="number_of_locations>0">
        <form>
            <label>
            <input type="radio" :value="number_of_locations" v-model="fileOption">
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
                        <th class="text-center" v-for="columnIndex in [...Array(number_of_customers).keys()]" :key="columnIndex">
                            <select class="form-select" aria-label=".form-select example"
                                    @change="handleCustomerChange($event, columnIndex)">
                              <option selected value="">Select a Customer</option>
                              <option v-for="c in this.all_customers" :key="c.names" :value="c.names">{{ c.names }}</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_locations).keys()]" :key="rowIndex">
                        <td>Location {{ rowIndex + 1 }}</td>
                        <td v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex"><input v-model="input_distances.distances[rowIndex][colIndex]" type="number" :name="'customer_' + rowIndex + '_' + colIndex"  placeholder='' class="form-control"/></td>
                    </tr>
                    <tr>
                      <td>Variable cost rate</td>
                      <td v-for="cIndex in [...Array(number_of_customers).keys()]" :key="cIndex"><input type="number" v-model="input_distances.variable_cost_rates[cIndex]" name='variable_cost_rate' class="form-control"/></td>
                    </tr>
                    <tr>
                      <td>Weightings</td>
                      <td v-for="cIndex in [...Array(number_of_customers).keys()]" :key="cIndex"><input type="number" v-model="input_distances.weightings[cIndex]" name='weighting' class="form-control"/></td>
                    </tr>
                </tbody>
            </table>
          <div v-if="fileOption===0">
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the distances file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handleDistancesFileUpload">
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the variable cost rates file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handleVariableCostRatesFileUpload">
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">Please input the weightings file.</label>
              <input class="form-control" type="file" id="formFile"  @change="handleWeightingsFileUpload">
            </div>
          </div>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('startAddAlgorithm', input_distances)">Start ADD-Algorithm</button>
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
