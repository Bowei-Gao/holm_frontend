<script>
export default {
    props: ['number_of_locations'],
    emits: ['continue'],
    data() {
        return {
            page: 0,
            result: {},
            locations: {
                x: [],
                y: [],
                fixedCost: []
            }
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
    
    <div class="container">
        <form>
            <table class="table input-group">
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
                        <td>Location {{ rowIndex }}</td>
                        <td><input type="number" name='X-coordinates'  placeholder='' class="form-control" v-model="locations.x[rowIndex]"/></td>
                        <td><input type="number" name='Y-coordinates'  placeholder='' class="form-control" v-model="locations.y[rowIndex]"/></td>
                        <td><input type="number" name='fixed_costs'  placeholder='' class="form-control" v-model="locations.fixedCost[rowIndex]"/></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <div class="input-group pull-right">
                <button type="submit" class="btn pull-right" @click="$emit('continue', locations)">Continue</button>
            </div>
        </form>
    </div>
</template>