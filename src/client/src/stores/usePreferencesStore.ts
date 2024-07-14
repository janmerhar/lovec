import { defineStore } from "pinia"
import { computed, ref } from "vue"

import { useSelect } from "@/composables/useSelect"

import i18n, {
  availableLocales,
  codeToLanguage,
  updateLocale,
} from "@/locales/i18n"
import type { Locale } from "@/locales/i18n"

export type ColorScheme = "light" | "dark"

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
    const { selectItem: selectColorScheme, selectedItem: colorScheme } =
      useSelect<ColorScheme>("light")

    const changeColorScheme = (scheme: ColorScheme) => {
      const isDark = scheme === "dark"

      document.documentElement.classList.toggle("ion-palette-dark", isDark)
    }

    const updateColorScheme = async () => {
      changeColorScheme(colorScheme.value as ColorScheme)
    }

    return {
      // Locale
      locale,
      language,
      selectLanguage: selectLanguage(updateLanguage),
      availableLanguages,
      // Color scheme
      colorScheme,
      selectColorScheme: selectColorScheme(updateColorScheme),
    }
  },
  {
    persist: true,
  }
)
