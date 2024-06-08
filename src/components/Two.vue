<script>
export default {
    props: ['number_of_locations'],
    emits: ['continue', 'home'],
    data() {
        return {
            page: 0,
            result: {},
            locations: {
                x: [],
                y: [],
                fixedCost: []
            },
            fileOption: this.number_of_locations,
        }
    },
  methods: {
    /*handleFixedCostsFileUpload(event) {
      if (event.target.files.length === 0) {
        console.error('No file selected.');
        return;
      }
      
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target.result;
        if (!content) {
            console.error('File is empty.');
            return;
        }

        this.locations.fixedCost = content.split(',')
            .map(item => +item.trim())
            .filter(item => !isNaN(item));

        console.log('Fixed costs updated:', this.locations.fixedCost);
      };
      
      reader.onerror = (err) => {
        console.error('Error reading file:', err);
      };
      
      reader.readAsText(file);
    }*/
    handleFixedCostsFileUpload(event) {
      if (event.target.files.length === 0) {
        console.error('No file selected.');
        return;
      }
      
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming that your data is in the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the sheet to JSON
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (json.length === 0) {
            console.error('No data found in the file.');
            return;
        }

        // Process the data as needed
        // Assuming the relevant values are in a specific column, e.g., first column
        this.locations.fixedCost = json.map(row => +row[0]).filter(item => !isNaN(item));

        console.log('Fixed costs updated:', this.locations.fixedCost);
      };

      reader.onerror = () => {
        console.error('Failed to read the file.');
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
            <h1 class="text-center">Potential Locations</h1>
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
                        <th class="text-center">X-coordinates of Potential Locations</th>
                        <th class="text-center">Y-coordinates of Potential Locations</th>
                        <th class="text-center">Fixed Costs of Potential Locations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_locations).keys()]" :key="rowIndex">
                        <td>Location {{ rowIndex + 1 }}</td>
                        <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="locations.x[rowIndex]"/></td>
                        <td><input type="number" name='Y-coordinates'  placeholder='' class="form-control" v-model="locations.y[rowIndex]"/></td>
                        <td><input type="number" name='fixed_costs'  placeholder='' class="form-control" v-model="locations.fixedCost[rowIndex]"/></td>
                    </tr>
                </tbody>
            </table>
          <div v-if="fileOption===0">
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
  <div class="container">
    <form>
      <br>
      <div class="input-group pull-right">
        <button type="submit" class="btn pull-right" @click="$emit('home')">Home</button>
      </div>
    </form>
  </div>
</template>