<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div style="height: 50%; width: 100%">
        <l-map ref="map" v-model:zoom="zoom" :center="coordinates">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
        </l-map>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue"

import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { Geolocation } from "@capacitor/geolocation"

export default {
  components: {
    IonPage,
    IonContent,
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 9,
      coordinates: [46.056946, 14.505751],
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
}
</script>
