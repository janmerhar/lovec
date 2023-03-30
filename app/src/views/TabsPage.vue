<template>
  <ion-page>
    <ion-tabs>
      <!-- Top tool bar -->
      <app-toolbar></app-toolbar>
      <!-- Component view -->
      <ion-router-outlet></ion-router-outlet>
      <!-- Bootom tool bar -->
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="jage" href="/tabs/jage">
          <font-awesome-icon icon="fa-solid fa-people-group" size="2x" />
          <ion-label>Jage</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="belezke" href="/tabs/belezke">
          <font-awesome-icon icon="fa-solid fa-note-sticky" size="2x" />
          <ion-label>Beležke</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="opazovalnica" href="/tabs/opazovalnica">
          <font-awesome-icon icon="fa-solid fa-tower-observation" size="2x" />
          <ion-label>Opazovalnice</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="oprema" href="/tabs/oprema">
          <font-awesome-icon icon="fa-solid fa-person-rifle" size="2x" />
          <ion-label>Oprema</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="revirji" href="/tabs/revirji">
          <font-awesome-icon icon="fa-solid fa-map-location-dot" size="2x" />
          <ion-label>Revirji</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <!-- End bottom tool bar -->
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue"
import AppToolbar from "@/components/AppToolbar.vue"
</script>
