<template>
  <input v-model="searchQuery" type="text" @input="searchLocation">
  <ul v-if="locations.length">
    <li v-for="location in locations" :key="location.place_id" @click="selectLocation(location)">
      {{ location.display_name }}
    </li>
  </ul>

  <div id="map" style="height: 400px;"></div>
</template>

<script>
import L from 'leaflet';
import axios from 'axios';

export default {
  mounted() {
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  },
  data() {
    return {
      searchQuery: '',
      locations: []
    };
  },
  methods: {
    async searchLocation() {
      if (this.searchQuery.length > 2) {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${this.searchQuery}`);
        console.log(response.data); // Process this data to show suggestions
      }
    },

    selectLocation(location) {
      console.log('Selected location coordinates:', location.lat, location.lon);
      // You can also update the map view here
    }
  }
}
</script>
