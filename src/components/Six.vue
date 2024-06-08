<script>
export default {
    props: ['number_of_depots', 'number_of_customers', 'all_depots', 'all_customers'],
    emits: ['startPlanning', 'home'],
    data() {
        return {
            input_assignment: {
                distances: Array.from({length: this.number_of_depots}, () => Array(this.number_of_customers).fill(0)),
                inventory: Array(this.number_of_depots).fill(0),
                demand: Array(this.number_of_customers).fill(0),
            },
            fileOption: this.number_of_depots,
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
        this.input_assignment.distances = lines.map(line =>
            line.split(',').map(item => +item.trim()).filter(item => !isNaN(item))
        );
      };
      reader.readAsText(file);
    },*/
        handleDistancesFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;  // Check if a file was actually selected

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});

                // Assuming the data is in the first sheet
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convert the sheet to a 2D array
                const json = XLSX.utils.sheet_to_json(worksheet, {header: 1});

                // Assuming each row represents distances and you want to convert all entries to numbers
                this.input_assignment.distances = json.map(row => 
                    row.map(item => +item).filter(item => !isNaN(item))
                );
            };

            reader.onerror = () => {
                console.error('Error reading file');
            };

            // Read the file as an array buffer
            reader.readAsArrayBuffer(file);
        },
    /*handleInventoryFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.input_assignment.inventory = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },*/
        handleInventoryFileUpload(event) {
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
                this.input_assignment.inventory = json.map(row => +row[0]).filter(item => !isNaN(item));
            };

            reader.onerror = () => {
                console.error('Error reading file');
            };

            // Read the file as an array buffer
            reader.readAsArrayBuffer(file);
        },
    /*handleDemandFileUpload(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Assuming each element of the array is on a new line
        this.input_assignment.demand = content.split(',').map(item => +item.trim()).filter(item => !isNaN(item));
      };
      reader.readAsText(file);
    },*/
        handleDemandFileUpload(event) {
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
                this.input_assignment.demand = json.map(row => +row[0]).filter(item => !isNaN(item));
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
            for (const customer of this.all_customers) {
                if (customer.names === event.target.value) {
                    this.input_assignment.demand[index] = customer.demand;
                    break;
                }
            }
        },
        handleDepotChange(event, index) {
            // this.selectedCustomers[index] = event.target.value;
            // console.log(`Customer selected in column ${index}: ${event.target.value}`);
            // Additional actions here
            for (const depot of this.all_depots) {
                if (depot.names === event.target.value) {
                    this.input_assignment.inventory[index] = depot.capacities;
                    break;
                }
            }
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

    <div class="container" v-if="number_of_depots>0">
        <form>
            <label>
            <input type="radio" :value="number_of_depots" v-model="fileOption">
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
                            <select class="form-select" aria-label=".form-select example" @change="handleCustomerChange($event, columnIndex)">
                              <option selected value="">Select a Customer</option>
                              <option v-for="c in this.all_customers" :key="c.names" :value="c.names">{{ c.names }}</option>
                            </select>
                        </th>
                        <th class="text-center">Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_depots).keys()]" :key="rowIndex">
                        <td>
                            <select class="form-select" aria-label=".form-select example" @change="handleDepotChange($event, rowIndex)">
                              <option selected value="">Select a Depot</option>
                              <option v-for="d in this.all_depots" :key="d.names" :value="d.names">{{ d.names }}</option>
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
          <div v-if="fileOption===0">
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
  <div class="container">
    <form>
      <br>
      <div class="input-group pull-right">
        <button type="submit" class="btn pull-right" @click="$emit('home')">Home</button>
      </div>
    </form>
  </div>
</template>