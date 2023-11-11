<script>
export default {
    props: ['number_of_locations', 'number_of_customers'],
    emits: ['startAddAlgorithm'],
    data() {
        return {
            page: 0,
            result: {},
            distances: Array.from({ length: this.number_of_locations }, () => Array(this.number_of_customers).fill(0))
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Distances</h1>
            <h3 class="text-center">Location Planning</h3>
        </div>
    </div>
    
    <div class="container">
        <form>
            <table class="table input-group">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center" v-for="columnIndex in [...Array(number_of_customers).keys()]" :key="columnIndex">
                            <select class="form-select" aria-label=".form-select example">
                                <option selected>Select a Customer</option>
                                <option value="1">Customer 4711</option>
                                <option value="2">Customer 4396</option>
                                <option value="3">Customer 3402</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_locations).keys()]" :key="rowIndex">
                        <td>Location {{ rowIndex }}</td>
                        <td v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex"><input v-model="distances[rowIndex][colIndex]" type="number" :name="'customer_' + rowIndex + '_' + colIndex"  placeholder='' class="form-control"/></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('startAddAlgorithm', distances)">Start ADD-Algorithm</button>
            </div>
        </form>
    </div>
</template>
