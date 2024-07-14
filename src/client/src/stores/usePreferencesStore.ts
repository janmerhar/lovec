import { defineStore } from "pinia"
import { computed, ref } from "vue"

import { useSelect } from "@/composables/useSelect"

import i18n, {
  availableLocales,
  codeToLanguage,
  updateLocale,
} from "@/locales/i18n"
import type { Locale } from "@/locales/i18n"

export const usePreferencesStore = defineStore(
  "preferences",
  () => {
    //
    // Language
    //
    const { selectItem: selectLanguage, selectedItem: locale } =
      useSelect<Locale>(i18n.global.locale.value)

    const language = computed(() => codeToLanguage[locale.value as Locale])

    const availableLanguages = availableLocales

    const updateLanguage = async () => {
      updateLocale(locale.value as Locale)
    }

    //
    // Color Scheme
    //
    const colorScheme = ref("light")

    /*
    - language-code: string
    - language options: string[]
    - changeLanguage: (language: string) => void
   */
    return {
      locale,
      language,
      selectLanguage: selectLanguage(updateLanguage),
      availableLanguages,
    }
  },
  {
    persist: true,
  }
)
