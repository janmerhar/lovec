<template>
  <div>
    <!-- Emitam samo center, ker click ne bo deloval -->
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="center"
      :options="{ zoomControl: false }"
      :useGlobalLeaflet="false"
      @update:center="centerUpdated"
      @update:bounds="boundariesUpdated"
      @dblclick="clickEventUpdated"
      @ready="(e) => console.log(e)"
      style="z-index: 50"
    >
      <!-- Base map -->
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="''"
      ></l-tile-layer>

      <slot></slot>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { ref, onMounted } from "vue"
import { Geolocation } from "@capacitor/geolocation"

const center = ref([46.056946, 14.505751])
const zoom = ref(9)

// Methods for reading data from map
const centerPosition = center
const boundaries = ref(null)
const clickEvent = ref(null)

onMounted(async () => {
  // Emitting at the start
  emit("center", centerPosition.value)

  Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
  }).then((res) => {
    centerPosition.value = [res.coords.latitude, res.coords.longitude]
    emit("center", centerPosition.value)
  })
})

const centerUpdated = (e: any) => {
  centerPosition.value = e
  emit("center", centerPosition.value)
}

const boundariesUpdated = (e: any) => {
  boundaries.value = e
}

const clickEventUpdated = (e: any, f: any) => {
  console.warn("map props", map.value)
  console.log("center", centerPosition.value)
  console.log("boundaries", boundaries.value)
  console.log("clickEvent", e, f)

  clickEvent.value = e
}

const emit = defineEmits(["center"])
const map = ref(null)
</script>

<style>
/* Disabling Leaftlet link in map component */
a {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
}
</style>
