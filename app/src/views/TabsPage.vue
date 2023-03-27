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
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Jage</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="revirji" href="/tabs/revirji">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Revirji</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="belezke" href="/tabs/belezke">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Beležke</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="opazovalnica" href="/tabs/opazovalnica">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Opazovalnica</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="oprema" href="/tabs/oprema">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Oprema</ion-label>
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
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue"
import { ellipse, square, triangle } from "ionicons/icons"
import AppToolbar from "@/components/AppToolbar.vue"
</script>
