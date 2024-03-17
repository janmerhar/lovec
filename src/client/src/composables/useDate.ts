import { ref } from "vue"

export const useDate = (input: Date | string) => {
  const date = ref<Date>(new Date(input))

  const update = (newDate: Date | string) => {
    date.value = new Date(newDate)
  }

  const isoDate = (): string => {
    const stringDate = `${date.value.getFullYear()}-${(
      date.value.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.value.getDate().toString().padStart(2, "0")}`

    return stringDate
  }

  const getMonth = (): string => {
    return date.value.toLocaleString(undefined, { month: "long" })
  }

  const getWeekdayShort = () => {
    return date.value.toLocaleString(undefined, { weekday: "short" })
  }

  const getDayNumber = () => {
    return date.value.getDate()
  }

  return { date, update, isoDate, getMonth, getWeekdayShort, getDayNumber }
}
