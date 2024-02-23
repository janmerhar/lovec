<template>
  <ion-card class="ion-no-margin ion-no-padding ion-margin-bottom">
    <ion-card-header
      class="ion-no-padding ion-padding-horizontal ion-padding-top"
    >
      <ion-card-title>{{ vplen.zival }}</ion-card-title>
      <ion-card-subtitle>{{ vplen.teza }}</ion-card-subtitle>
    </ion-card-header>
    <!--  -->
    <ion-card-content>
      <ion-list>
        <!--  -->
        <ion-item v-for="(bolezen, index) in vplen.bolezni" :key="index">
          <ion-thumbnail slot="start">
            <font-awesome-icon icon="fa-solid fa-square-virus" size="3x" />
          </ion-thumbnail>
          <ion-label>{{ bolezen }}</ion-label>
        </ion-item>
        <!--  -->
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonThumbnail,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonThumbnail,
    IonItem,
    IonList,
    IonLabel,
  },
  props: ["vplen"],
})
</script>

<style scoped>
ion-item {
  --padding-start: 0;
}

ion-thumbnail {
  height: 40px;
  width: 40px;
}

font-awesome-icon {
  height: 40px !important;
  width: 40px !important;
}
</style>
