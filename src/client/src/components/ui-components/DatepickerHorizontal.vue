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

<script setup lang="ts">
import { IonGrid, IonRow, IonCol } from "@ionic/vue"

import { onBeforeMount, ref } from "vue"

const emit = defineEmits(["change"])

const selectedDate = ref<Date>(new Date())
const dates = ref<Date[]>([])

function getWeekDates(inputDate: Date) {
  const currentDate = inputDate
  const weekDates = []

  const currentDayOfWeek = currentDate.getDay()

  const firstDayOfWeek = new Date(currentDate)
  const daysUntilMonday = (currentDayOfWeek === 0 ? 7 : currentDayOfWeek) - 1
  firstDayOfWeek.setDate(currentDate.getDate() - daysUntilMonday)

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek)
    date.setDate(firstDayOfWeek.getDate() + i)
    weekDates.push(new Date(date))
  }

  return weekDates
}

function setWeekDates(inputDate: Date) {
  dates.value = getWeekDates(inputDate)
}

function moveForward() {
  const baseDate = dates.value[0]
  baseDate.setDate(baseDate.getDate() + 7)

  setWeekDates(baseDate)
}

function moveBackward() {
  const baseDate = dates.value[0]
  baseDate.setDate(baseDate.getDate() - 7)

  setWeekDates(baseDate)
}

function changeDate(date: Date) {
  selectedDate.value = date

  const stringDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`

  emit("change", stringDate)
}

onBeforeMount(() => {
  setWeekDates(new Date())
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
