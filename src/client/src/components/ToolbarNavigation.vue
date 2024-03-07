<template>
  <ion-header>
    <ion-toolbar class="responsive-toolbar">
      <ion-title size="large">Lovec</ion-title>
      <ion-buttons slot="secondary">
        <ion-button @click="redirectTo('izkaznica')">
          <img
            :src="profile_picture"
            alt="Profilna slika"
            :class="selectedTabStyle('izkaznica')"
          />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/vue"

import { ref } from "vue"

import { useTabNavigation } from "@/composables/useTabNavigation"

const { selectedTabStyle, redirectTo } = useTabNavigation()

const profile_picture = ref<string>(
  "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F08%2Fsimp_homersingle08_f_hires2-2000.jpg&q=60"
)
</script>

<style scoped>
img {
  width: 31px;
  height: 31px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--ion-color-step-600);
}

.active-tab {
  border: 2px solid var(--ion-color-primary);
}
</style>
