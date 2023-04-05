<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <card-jaga>banana</card-jaga>
      <card-jaga>ananab</card-jaga>
      <card-jaga>eggplant</card-jaga>
      <card-jaga>peach</card-jaga>
      <card-jaga>peachy</card-jaga>

      <fab-button @click.prevent="openModal"></fab-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  modalController,
} from "@ionic/vue"

import FabButton from "@/components/FabButtonAdd.vue"
import CardJaga from "@/components/CardJaga.vue"
import ModalJagaAdd from "@/components/ModalJagaAdd.vue"

import { defineComponent } from "vue"
export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FabButton,
    CardJaga,
    // modalController,
  },
  setup() {
    return { message: "" }
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: ModalJagaAdd,
      })
      modal.present()

      const { data, role } = await modal.onWillDismiss()

      if (role === "confirm") {
        this.message = `Hello, ${data}!`
      }
    },
  },
})
</script>
