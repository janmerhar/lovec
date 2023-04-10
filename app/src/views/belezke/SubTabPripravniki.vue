<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Podrobnosti o vseh pripravnikih</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Podrobnosti o vseh pripravnikih" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue"
import ExploreContainer from "@/components/ExploreContainer.vue"
</script>
