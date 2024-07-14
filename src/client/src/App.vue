<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { IonApp, IonRouterOutlet } from "@ionic/vue"

import { storeToRefs } from "pinia"
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import type { Locale } from "@/locales/i18n"

const preferencesStore = usePreferencesStore()
const { locale } = storeToRefs(preferencesStore)
const { selectLanguage } = preferencesStore

selectLanguage(locale.value as Locale)
</script>
