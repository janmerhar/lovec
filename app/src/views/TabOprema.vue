<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refresh"></refresher-component>
      <!--  -->
      <h3 class="ion-text-center">Evidenca opreme</h3>
      <!--  -->

      <template v-for="elOprema in oprema" :key="elOprema.id">
        <card-oprema-description
          :oprema="elOprema"
          @izbrisi="(deleteOprema) => izbrisi(deleteOprema)"
        ></card-oprema-description>
      </template>
      <!--  -->
      <fab-button-add @click.prevent="openModalOpremaAdd"></fab-button-add>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, modalController } from "@ionic/vue"

import { defineComponent } from "vue"
import { ref } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalOpremaAdd from "@/components/oprema/ModalOpremaAdd.vue"
import CardOpremaDescription from "@/components/oprema/CardOpremaDescription.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"

import { Oprema } from "@/entities/Oprema"

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    FabButtonAdd,
    CardOpremaDescription,
    RefresherComponent,
  },
  data() {
    return {
      oprema: ref<Oprema[]>([]),
    }
  },
  methods: {
    async openModalOpremaAdd() {
      const modal = await modalController.create({
        component: ModalOpremaAdd,
      })
      modal.present()

      const { data, role } = await modal.onWillDismiss()

      if (role === "confirm") {
        // this.oprema.push(data)
        console.log("123")
      }
    },

    async fetchUporabnikOprema() {
      const result = await Oprema.fetchOprema(this.axios)

      this.oprema = result.data
    },

    async izbrisi(oprema: Oprema) {
      await oprema.izbrisiOprema()
      await this.fetchUporabnikOprema()
    },

    async refresh(event: CustomEvent) {
      await this.fetchUporabnikOprema()
      event.detail.complete()
    },
  },
  async beforeMount() {
    await this.fetchUporabnikOprema()
  },
})
</script>
