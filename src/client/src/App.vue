<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { IonApp, IonRouterOutlet } from "@ionic/vue"

// Preferences
import { storeToRefs } from "pinia"
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import type { Locale } from "@/locales/i18n"
import type { ColorScheme } from "@/stores/usePreferencesStore"

const preferencesStore = usePreferencesStore()

// Language
const { locale } = storeToRefs(preferencesStore)
const { selectLanguage } = preferencesStore

selectLanguage(locale.value as Locale)

// Color scheme
const { colorScheme } = storeToRefs(preferencesStore)
const { selectColorScheme } = preferencesStore

selectColorScheme(colorScheme.value as ColorScheme)
</script>
