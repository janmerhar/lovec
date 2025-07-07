<template>
  <h4
    style="
      text-transform: capitalize;
      padding-left: 0.5rem;
      margin-bottom: 0.5rem;
      color: var(--ion-text-color);
    "
  >
    {{ useDate(dates[0]).getMonth() }}
  </h4>
  <div
    style="
      display: flex;
      justify-content: space-between;
      color: var(--ion-text-color);
    "
  >
    <!-- Puscica za naprej -->
    <div
      class="arrow bubble"
      style="padding-left: 1rem"
      @click.prevent="moveBackward()"
    >
      <font-awesome-icon
        style="transform: translateX(-40%)"
        :icon="['fas', 'chevron-left']"
      />
    </div>

    <template v-for="(date, index) in dates" :key="index">
      <div @click.prevent="changeDate(date)">
        <div
          class="day text-center bubble"
          :class="{
            selected: date.toDateString() == selectedDate.toDateString(),
          }"
        >
          {{ useDate(date).getDayNumber() }}
        </div>

        <div :class="{ weekend: index + 1 >= 6 }" class="day-name text-center">
          {{ useDate(date).getWeekdayShort().toUpperCase()[0] }}
        </div>
      </div>
    </template>

    <!-- Puscica za nazaj -->
    <div class="arrow bubble" @click.prevent="moveForward()">
      <font-awesome-icon
        style="transform: translateX(80%)"
        :icon="['fas', 'chevron-right']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useDate } from "@/composables/useDate"

const emit = defineEmits(["change"])

const selectedDate = ref<Date>(new Date())
const dates = ref<Date[]>([])

const getWeekDates = (inputDate: Date) => {
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

const setWeekDates = (inputDate: Date) => {
  dates.value = getWeekDates(inputDate)
}

const moveForward = () => {
  const baseDate = dates.value[0]
  baseDate.setDate(baseDate.getDate() + 7)

  setWeekDates(baseDate)
}

const moveBackward = () => {
  const baseDate = dates.value[0]
  baseDate.setDate(baseDate.getDate() - 7)

  setWeekDates(baseDate)
}

const changeDate = (date: Date) => {
  selectedDate.value = date

  const stringDate = useDate(date).isoDate()

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

  color: var(--ion-background-color-step-950);

  font-weight: bold;
  border-radius: var(--border-rad);
}

.selected {
  background-color: var(--ion-color-danger) !important;
}

.day {
  font-size: 1.2rem;

  padding-top: 0.45rem;
  padding-bottom: 0.45rem;
  cursor: pointer;
}

.day-name {
  font-size: 0.8rem;
}
.weekend {
  color: var(--ion-color-danger);
  cursor: pointer;
}

.text-center {
  text-align: center;
}

.arrow {
  display: flex;
  align-items: center;
  align-items: center;
  height: 100%;
  font-size: 1.3rem;
  cursor: pointer;
}

.bubble {
  background-color: var(--ion-color-primary);
  color: var(--ion-color-light);
  border-radius: 50%;
  /* TODO */
  width: 35px;
  height: 35px;
}
</style>
