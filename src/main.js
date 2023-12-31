import { createApp } from 'vue'

import App from './App.vue'
import Zero from './components/Zero.vue'
import One from './components/One.vue'
import Two from './components/Two.vue'
import Three from './components/Three.vue'
import Four from './components/Four.vue'
import Five from './components/Five.vue'
import Six from './components/Six.vue'
import Seven from './components/Seven.vue'
import Eight from './components/Eight.vue'
import Nine from './components/Nine.vue'
import Ten from './components/Ten.vue'
import Eleven from './components/Eleven.vue'

const app = createApp(App)
app.component('zero', Zero)
app.component('one', One)
app.component('two', Two)
app.component('three', Three)
app.component('four', Four)
app.component('five', Five)
app.component('six', Six)
app.component('seven', Seven)
app.component('eight', Eight)
app.component('nine', Nine)
app.component('ten', Ten)
app.component('eleven', Eleven)
app.mount('#app')
