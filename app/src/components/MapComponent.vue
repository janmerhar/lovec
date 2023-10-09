<template>
  <!-- 
    Delata tezave, saj preostali elementi jih prekrivajo
    - IonPage
    - IonContent
   -->
  <div style="height: 50%; width: 100%">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="coordinates"
      :options="{ zoomControl: false }"
      :useGlobalLeaflet="false"
    >
      <!-- Base map -->
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="''"
      ></l-tile-layer>

      <!-- Marker for user -->
      <template>
        <l-marker :lat-lng="coordinates" :icon="iconLovec"></l-marker>
      </template>
      <!-- Marker for other users, but only if they are in revir -->

      <!-- <template>
        <l-marker :lat-lng="[]" :icon="iconLovecNeuporabnik"></l-marker>
      </template> -->

      <!-- Markers for opazovalnice -->
      <template v-for="(opazovalnica, index) in opazovalnice" :key="index">
        <l-marker
          :lat-lng="opazovalnica.koordinate"
          :icon="iconOpazovalnica"
          @click="$emit('opazovalnica', index)"
        ></l-marker>
      </template>
      <!--  -->

      <!-- Polygon  za revirje -->
      <l-polygon :lat-lngs="revirDemo" :color="'red'"></l-polygon>
    </l-map>
  </div>
</template>

<script>
// L ne smem v celoti importat, temvec importam samo delne componennete v beforeMount()
// funkciji
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LPolygon } from "@vue-leaflet/vue-leaflet"
import { Geolocation } from "@capacitor/geolocation"

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolygon,
  },
  data() {
    return {
      // Lastnosti prikaza zemljevida
      zoom: 9,
      coordinates: [46.056946, 14.505751],
      // Ikone
      // https://github.com/pointhi/leaflet-color-markers
      iconLovec: null,
      iconLovecNeuporabnik: null,
      iconOpazovalnica: null,
      // Popups
      caller: null,
      // Demo podatki
      revirDemo: [
        [45.7399923, 14.7261067],
        [45.6430266, 14.8552701],
        [45.8040475, 15.1696684],
        [45.9079394, 15.0071462],
        [45.86029815673828, 14.833971977233887],
        // [45.9576254, 14.6531854],
        // [46.2257358, 14.6118936],
        // [45.9663607, 14.2980772],
      ],
    }
  },
  props: ["opazovalnice", "revirji"],
  methods: {
    openPopUp(latLng, caller) {
      this.caller = caller
      this.$refs.features.mapObject.openPopup(latLng)
    },
    async setIcons() {
      const { Icon } = await import("leaflet")
      this.iconLovec = new Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      this.iconLovecNeuporabnik = new Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      this.iconOpazovalnica = new Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
    },
  },
  // https://www.npmjs.com/package/@vue-leaflet/vue-leaflet
  // SSR
  async beforeMount() {
    await this.setIcons()
  },
  async mounted() {
    const res = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    })

    console.log(res.coords)
    this.coordinates = [res.coords.latitude, res.coords.longitude]
  },
}
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
