<script>
export default {
    props: ['number_of_customers'],
    emits: ['startSavingsAlgorithm']
}
</script>

<template>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">Distances</h1>
            <h3 class="text-center">Vehicle Routing</h3>
        </div>
    </div>
    
    <div class="container">
        <form>
            <table class="table input-group" v-if="number_of_customers>0">
                <thead>
                    <tr>
                        <th></th>
                        <th>Depot</th>
                        <th class="text-center" v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex">Customer {{ colIndex }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Depot</td>
                        <td><input type="text" name='customer_0' class="form-control"/></td>
                        <td v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex"><input type="text" name='customer_0' class="form-control"/></td>
                    </tr>
                    <tr v-for="rowIndex in [...Array(number_of_customers).keys()]" :key="rowIndex">
                        <td>Customer {{ rowIndex }}</td>
                        <td><input type="text" name='customer_0' class="form-control" disabled/></td>
                        <td v-for="colIndex in [...Array(number_of_customers).keys()]" :key="colIndex"><input type="text" name='customer_0' class="form-control" :disabled="colIndex < rowIndex"/></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('startSavingsAlgorithm')">Start Savings-Algorithm</button>
            </div>
        </form>
    </div>
</template>