<script>
export default {
    props: ['number_of_customers'],
    emits: ['continue'],
    data() {
        return {
        page: 0,
        result: {},
        customers: {
            x: [],
            y: [],
            deliveryQuantities: []
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
    
    <div class="container">
        <form>
            <table class="table input-group">
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
                        <td class="text-center">Customer {{ rowIndex }}</td>
                        <td>
                            <select class="form-select" aria-label=".form-select example">
                                <option selected>Select a Customer</option>
                                <option value="1">Customer 4711</option>
                                <option value="2">Customer 4396</option>
                                <option value="3">Customer 3402</option>
                            </select>
                        </td>
                        <td><input type="number" name='delivery_quantity'  placeholder='' class="form-control" v-model="customers.deliveryQuantities[rowIndex]"/></td>
                        <td><input type="text" name='pickup_quantity'  placeholder='' class="form-control"/></td>
                        <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="customers.x[rowIndex]"/></td>
                        <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="customers.y[rowIndex]"/></td>
                    </tr>
                </tbody>
            </table>
            <div class="well"><h5>Customers that were assigned to the chosen depot in the tactical planning.</h5></div>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('continue', customers)">Continue</button>
            </div>
        </form>
    </div>
</template>