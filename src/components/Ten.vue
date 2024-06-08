<script>
export default {
    props: ['number_of_customers'],
    emits: ['startSavingsAlgorithm', 'home'],
    data() {
        return {
            distances: Array.from({ length: (this.number_of_customers + 1) }, () => Array(this.number_of_customers + 1).fill(null)),
            fileOption: this.number_of_customers,
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
                this.distances = lines.map(line =>
                    line.split(',').map(item => +item.trim()).filter(item => !isNaN(item))
                );
            };
            reader.readAsText(file);
        }*/
        handleDistancesFileUpload(event) {
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

                // Assuming you want to parse all entries in each row as distances
                this.distances = json.map(row => 
                    row.map(item => +item).filter(item => !isNaN(item))
                );
            };

            reader.onerror = () => {
                console.error('Error reading file');
            };

            // Read the file as an array buffer
            reader.readAsArrayBuffer(file);
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
          <div v-if="fileOption===0">
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