<template>
  <ion-grid>
    <ion-row>
      <ion-col>{{
        dates[0]?.toLocaleString(undefined, { month: "long" })
      }}</ion-col>
    </ion-row>

    <!-- Puscica za naprej -->
    <ion-row>
      <ion-col @click.prevent="moveBackward()">
        <font-awesome-icon :icon="['fas', 'chevron-left']"
      /></ion-col>

      <!-- Array za prikaz dni -->
      <ion-col
        v-for="(date, index) in dates"
        :key="index"
        class="date-box"
        :class="{
          selected: date.toDateString() == selectedDate.toDateString(),
        }"
        @click.prevent="changeDate(date)"
      >
        <div :class="{ weekend: index + 1 >= 6 }">
          {{
            date
              .toLocaleDateString(undefined, { weekday: "short" })
              .toUpperCase()
          }}
        </div>
        <div class="day">
          {{ date.getDate() }}
        </div>
      </ion-col>

      <!-- Puscica za nazaj -->
      <ion-col @click.prevent="moveForward()">
        <font-awesome-icon :icon="['fas', 'chevron-right']"
      /></ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol } from "@ionic/vue"

import { defineComponent, ref } from "vue"

export default defineComponent({
  components: {
    IonGrid,
    IonRow,
    IonCol,
  },
  emits: ["change"],
  data() {
    return {
      selectedDate: ref<Date>(new Date()),
      dates: ref<Date[]>([]),
    }
  },
  methods: {
    getWeekDates(inputDate: Date) {
      const currentDate = inputDate
      const weekDates = []

      const currentDayOfWeek = currentDate.getDay()

      const firstDayOfWeek = new Date(currentDate)
      const daysUntilMonday =
        (currentDayOfWeek === 0 ? 7 : currentDayOfWeek) - 1
      firstDayOfWeek.setDate(currentDate.getDate() - daysUntilMonday)

      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek)
        date.setDate(firstDayOfWeek.getDate() + i)
        weekDates.push(new Date(date))
      }

      return weekDates
    },

    setWeekDates(inputDate: Date) {
      this.dates = this.getWeekDates(inputDate)
    },

    moveForward() {
      const baseDate = this.dates[0]
      baseDate.setDate(baseDate.getDate() + 7)

      this.setWeekDates(baseDate)
    },

    moveBackward() {
      const baseDate = this.dates[0]
      baseDate.setDate(baseDate.getDate() - 7)

      this.setWeekDates(baseDate)
    },

    changeDate(selectedDate: Date) {
      this.selectedDate = selectedDate

      this.$emit("change", selectedDate)
    },
  },
  mounted() {
    this.setWeekDates(new Date())
  },
})
</script>

<style scoped>
ion-col {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  color: var(--ion-color-step-950);

  font-weight: bold;
  border-radius: var(--border-rad);
}

.selected {
  background-color: var(--ion-color-primary);
  color: var(--ion-color-light);
}

.day {
  font-size: 1.2rem;

  padding-top: 0.45rem;
  padding-bottom: 0.45rem;
}

.weekend {
  color: var(--ion-color-danger);
}
</style>
