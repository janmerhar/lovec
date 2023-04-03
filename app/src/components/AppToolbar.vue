<template>
  <ion-header>
    <ion-toolbar>
      <ion-title size="large">Lovec</ion-title>
      <ion-buttons slot="secondary">
        <ion-button
          fill="solid"
          @click="() => router.push({ name: 'izkaznica' })"
        >
          <font-awesome-icon icon="fa-solid fa-id-card " />
          <p class="ion-margin">Izkaznica</p>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/vue"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
  },
  setup() {
    const router = useRouter()
    return { router }
  },
})
</script>
