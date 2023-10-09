<template>
  <header-modal @cancel="cancel()" @confirm="confirm()"
    >Vnesi jago</header-modal
  >
  <!--  -->
  <ion-content class="ion-padding">
    <datepicker-horizontal
      @change="(novDatum) => updateDate(novDatum)"
    ></datepicker-horizontal>
    <div>
      <ion-text color="primary">
        <h4>Naslov 3</h4>
      </ion-text>
      <ion-text color="dark">
        <p>Neki content notri lol</p>
      </ion-text>
    </div>
    <div>
      <ion-text color="primary">
        <h4>Naslov 3</h4>
      </ion-text>
      <ion-text color="dark">
        <p>Neki content notri lol</p>
      </ion-text>
    </div>
  </ion-content>
  <!--  -->
</template>

<script lang="ts">
import { IonContent, modalController, IonText } from "@ionic/vue"
import { defineComponent } from "vue"

import HeaderModal from "@/components/ui-components/HeaderModal.vue"
import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"

export default defineComponent({
  name: "ModalJagaDescription",
  components: {
    IonContent,
    IonText,
    HeaderModal,
    DatepickerHorizontal,
  },
  data() {
    return {
      name: "",
      datum: new Date(),
    }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel")
    },

    confirm() {
      return modalController.dismiss(this.name, "confirm")
    },

    updateDate(novDatum: Date) {
      this.datum = novDatum
    },
  },
})
</script>
