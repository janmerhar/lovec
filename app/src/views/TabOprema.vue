<template>
  <ion-page>
    <ion-content :fullscreen="true">
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
import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalOpremaAdd from "@/components/oprema/ModalOpremaAdd.vue"
import CardOpremaDescription from "@/components/oprema/CardOpremaDescription.vue"

import { defineComponent } from "vue"

import { IonPage, IonContent, modalController } from "@ionic/vue"

import { Oprema } from "@/entities/Oprema"

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    FabButtonAdd,
    CardOpremaDescription,
  },
  data() {
    return {
      oprema: [],
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
      const result = await Oprema.fetchUporabnikOprema()

      this.oprema = result.data
    },
    async izbrisi(id) {
      await Oprema.izbrisiOprema(id)
      await this.fetchUporabnikOprema()
    },
  },
  async beforeMount() {
    Oprema.setCustomAxios(this.axios)

    await this.fetchUporabnikOprema()
  },
})
</script>
