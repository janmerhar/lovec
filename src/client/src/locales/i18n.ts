import { createI18n } from "vue-i18n"

import si from "@/locales/si"
import en from "@/locales/en"

const i18n = createI18n({
  locale: "si",
  messages: {
    si,
    en,
  },
  legacy: false,
})

export default i18n

export const codeToLanguage = {
  si: "Slovenščina",
  en: "English",
}

export type Locale = keyof typeof codeToLanguage
export const availableLocales = i18n.global.availableLocales

export const updateLocale = (locale: Locale): boolean => {
  if (availableLocales.includes(locale)) {
    i18n.global.locale.value = locale

    return true
  }

  return false
}
