<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div style="height: 50%; width: 100%">
        <l-map ref="map" v-model:zoom="zoom" :center="coordinates">
          <!-- Base map -->
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
            :attriburion="''"
          ></l-tile-layer>
          <!-- Marker for user -->
          <template>
            <l-marker :lat-lng="coordinates" :icon="iconLovec"></l-marker>
          </template>
          <!-- Markers for opazovalnice -->
          <template
            v-for="(opazovalnica, index) in opazovalniceDemo"
            :key="index"
          >
            <l-marker
              :lat-lng="opazovalnica"
              :icon="iconOpazovalnica"
            ></l-marker>
          </template>
          <!-- Polygon  za revirje -->
          <l-polygon :lat-lngs="revirDemo" :color="'red'"></l-polygon>
        </l-map>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LPolygon } from "@vue-leaflet/vue-leaflet"
import { Geolocation } from "@capacitor/geolocation"

export default {
  components: {
    IonPage,
    IonContent,
    LMap,
    LTileLayer,
    LMarker,
    LPolygon,
  },
  data() {
    return {
      //
      attribution: "&copy; OpenStreetMap contributors",
      //
      zoom: 9,
      coordinates: [46.056946, 14.505751],
      // Ikone
      // icon colors
      // https://github.com/pointhi/leaflet-color-markers
      iconLovec: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      iconOpazovalnica: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      // Popups
      caller: null,
      // Demo opazovalnice
      opazovalniceDemo: [
        [45.9576254, 14.6531854],
        [46.2257358, 14.6118936],
        [45.9663607, 14.2980772],
      ],
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
  props: {
    revirji: {
      default: [],
    },
    opazovalnice: {
      default: [],
    },
  },
  mounted() {
    Geolocation.getCurrentPosition().then((res) => {
      console.log(res.coords)
      this.coordinates = [res.coords.latitude, res.coords.longitude]
    })
  },
  methods: {
    openPopUp(latLng, caller) {
      this.caller = caller
      this.$refs.features.mapObject.openPopup(latLng)
    },
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
