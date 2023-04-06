<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <card-jaga @join="openModalJagaDescription">banana</card-jaga>
      <card-jaga @join="openModalJagaDescription">ananab</card-jaga>

      <card-jaga
        @card="openModalJagaDescription"
        @join="openModalJagaDescription"
        >eggplant</card-jaga
      >
      <card-jaga @join="openModalJagaDescription">peach</card-jaga>
      <card-jaga @join="openModalJagaDescription">peachy</card-jaga>

      <fab-button @click.prevent="openModalJagaAdd"></fab-button>
    </ion-content>
  </ion-page>
</template>

<script>
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
import ModalJagaDescription from "@/components/ModalJagaDescription.vue"

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
  },
  setup() {
    return { message: "", isOpen: false }
  },
  methods: {
    async openModalJagaAdd() {
      console.warn("click ModalJagaAdd")
      const modal = await modalController.create({
        component: ModalJagaAdd,
      })
      modal.present()

      const { data, role } = await modal.onWillDismiss()

      if (role === "confirm") {
        this.message = `Hello, ${data}!`
      }
    },
    async openModalJagaDescription() {
      console.warn("click ModalJagaDescription ")
      const modal = await modalController.create({
        component: ModalJagaDescription,
      })
      modal.dismiss()
      modal.present()

      const { data, role } = await modal.onWillDismiss()

      if (role === "confirm") {
        this.message = `Hello, ${data}!`
      }
    },
  },
})
</script>
