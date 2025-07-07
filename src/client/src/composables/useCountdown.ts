import { computed, ref } from "vue"

export function useCountdown(futureDate: Date) {
  const timeLeft = {
    seconds: ref(0),
    minutes: ref(0),
    hours: ref(0),
    days: ref(0),
    months: ref(0),
    years: ref(0),
  }

  let interval: any = ""
  const clearCountdown = () => {
    clearInterval(interval)
  }

  const calculateTimeLeft = () => {
    const timeRemaining = Date.parse(futureDate.toString()) - Date.now()
    if (timeRemaining < 0) {
      clearCountdown()
      return timeLeft
    }

    timeLeft.seconds.value = Math.floor((timeRemaining / 1000) % 60)
    timeLeft.minutes.value = Math.floor((timeRemaining / 1000 / 60) % 60)
    timeLeft.hours.value = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
    timeLeft.days.value = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    timeLeft.months.value = Math.floor(timeLeft.days.value / 30)
    timeLeft.years.value = Math.floor(timeLeft.months.value / 12)

    return timeLeft
  }

  interval = setInterval(calculateTimeLeft, 1000)
  calculateTimeLeft()

  const timer = computed(() => "")

  return {
    timeLeft,
    clearCountdown,
    timer,
  }
}
