<template>
  <header-modal @cancel="cancel()" @confirm="confirm()" :confirm-button="false"
    >Vplen</header-modal
  >
  <!--  -->
  <ion-content class="ion-padding">
    <h3 class="ion-text-center ion-padding-bottom">
      {{ formatDateToString($attrs.datum as string) }}
    </h3>

    <template v-for="vplen in vpleni" :key="vplen.id">
      <card-vplen-description :vplen="vplen"></card-vplen-description>
    </template>
  </ion-content>
  <!--  -->
</template>

<script lang="ts">
import { IonContent, modalController } from "@ionic/vue"
import { defineComponent, ref } from "vue"

import CardVplenDescription from "@/components/vplen/CardVplenDescription.vue"
import HeaderModal from "@/components/ui-components/HeaderModal.vue"

import { Vplen } from "@/entities/Vplen"

export default defineComponent({
  name: "ModalVplenDescription",
  components: {
    IonContent,
    CardVplenDescription,
    HeaderModal,
  },
  data() {
    return {
      vpleni: ref<Vplen[]>([]),
    }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel")
    },

    confirm() {
      return modalController.dismiss(null, "confirm")
    },

    formatDateToString(date: string) {
      const datum = new Date(date)
      const formattedDate = datum.toLocaleDateString("sl-SI", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })

      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    },

    async fetchVplenPodrobnosti(datum: string) {
      const vpleni = await Vplen.fetchVplen(this.axios, datum)

      this.vpleni = vpleni.data
    },
  },
  async beforeMount() {
    await this.fetchVplenPodrobnosti(this.$attrs.datum as string)
  },
})
</script>
