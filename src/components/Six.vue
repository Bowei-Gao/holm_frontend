<script>
export default {
    props: ['number_of_depots', 'number_of_customers'],
    emits: ['startPlanning']
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
                        <th class="text-center">Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in [...Array(number_of_depots).keys()]" :key="rowIndex">
                        <td>
                            <select class="form-select" aria-label=".form-select example">
                                <option selected>Select a Depot</option>
                                <option value="1">Depot ABC</option>
                                <option value="2">Depot WDF</option>
                                <option value="3">Depot ZGF</option>
                            </select>
                        </td>
                        <td v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex"><input type="text" name='customer_0' class="form-control"/></td>
                        <td><input type="text" name='capacity'  placeholder='' class="form-control"/></td>
                    </tr>
                    <tr>
                        <td class="text-center">Demand</td>
                        <td v-for="cIndex in [...Array(number_of_customers).keys()]" :key="cIndex"><input type="text" name='demand_0' class="form-control"/></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('startPlanning')">Start Planning</button>
            </div>
        </form>
    </div>
</template>