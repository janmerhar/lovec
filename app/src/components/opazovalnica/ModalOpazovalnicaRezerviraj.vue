<template>
  <ion-header @cancel="cancel()" @confirm="confirm()"></ion-header>
  <!--  -->
  <ion-content class="ion-padding">
    <h3>Prihod</h3>
    <ion-datetime
      presentation="date-time"
      :prefer-wheel="true"
      locale="sl-SI"
      hourCycle="h23"
      :first-day-of-week="1"
      size="cover"
      v-model="zacetek"
    >
      <span slot="time-label">Začetek</span>
    </ion-datetime>
    <br />
    <h3>Odhod</h3>
    <ion-datetime
      presentation="date-time"
      :prefer-wheel="true"
      locale="sl-SI"
      hourCycle="h23"
      :first-day-of-week="1"
      size="cover"
      v-model="konec"
    >
      <span slot="time-label">Zaključek</span>
    </ion-datetime>
  </ion-content>
  <!--  -->
</template>

<script lang="ts">
import { IonContent, IonHeader, modalController, IonDatetime } from "@ionic/vue"

import { defineComponent } from "vue"

import { Opazovalnica } from "@/entities/Opazovalnica"

export default defineComponent({
  name: "ModalVplenAdd",
  components: {
    IonContent,
    IonHeader,
    IonDatetime,
  },
  data() {
    return {
      zacetek: this.defaultDatetime(),
      konec: this.defaultDatetime(),
    }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel")
    },

    async confirm() {
      // Check if zacetek is before konec
      if (this.zacetek >= this.konec) {
        return
      }

      const result = await (
        this.$attrs.opazovalnica as Opazovalnica
      ).rezervirajOpazovalnico(this.zacetek, this.konec)
      console.log(result)

      if (result.status == 200) {
        return modalController.dismiss(null, "confirm")
      }

      return
    },

    defaultDatetime(): string {
      const currentDate = new Date()

      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, "0") // Month is zero-based, so we add 1 and pad with leading zeros if needed
      const day = String(currentDate.getDate()).padStart(2, "0") // Pad with leading zeros if needed

      const hours = String(currentDate.getHours()).padStart(2, "0") // Pad with leading zeros if needed
      const minutes = String(currentDate.getMinutes()).padStart(2, "0") // Pad with leading zeros if needed
      const seconds = String(currentDate.getSeconds()).padStart(2, "0") // Pad with leading zeros if needed

      const timezoneOffset = currentDate.getTimezoneOffset()
      const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
      const timezoneOffsetMinutes = Math.abs(timezoneOffset) % 60
      const timezoneSign = timezoneOffset < 0 ? "+" : "-"

      const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${String(
        timezoneOffsetHours
      ).padStart(2, "0")}:${String(timezoneOffsetMinutes).padStart(2, "0")}`

      return dateString
    },
  },
})
</script>
