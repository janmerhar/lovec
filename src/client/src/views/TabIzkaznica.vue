<template>
  <tab-template
    :refresh="
      async (e) => {
        await selectItem(uporabnikId)
        e.detail.complete()
      }
    "
    :is-scrollable="false"
  >
    <template #header>
      <tab-header>{{ $t("izkaznica.tab.header") }}</tab-header>
    </template>
    <template #body>
      <image-profile :slika="selectedUporabnik?.slika"> </image-profile>

      <!--  -->
      <list-container>
        <template #title>
          <list-title>
            {{ $t("izkaznica.tab.sections.personalData") }}
            <!-- TODO: ti si samo za admina i guess -->
            <!-- <template #end>uredi</template> -->
          </list-title>
        </template>

        <template #default>
          <list-item>
            <template #title>
              {{ $t("izkaznica.crud.categories.role") }}
            </template>
            <template #value>
              {{ selectedUporabnik?.role }}
            </template>
          </list-item>

          <list-item v-if="selectedUporabnik?.role == 'pripravnik'">
            <template #title>
              {{ $t("izkaznica.crud.categories.mentor") }}
            </template>
            <template #value>
              {{ selectedUporabnik?.mentor?.ime }}
              {{ selectedUporabnik?.mentor?.priimek }}
            </template>
          </list-item>

          <list-item>
            <template #title>
              {{ $t("izkaznica.crud.categories.druzina") }}
            </template>
            <template #value>
              {{ selectedUporabnik?.druzina?.ime }}
            </template>
          </list-item>
        </template>
      </list-container>

      <list-container v-if="selectedUporabnik?.role == 'lovec'">
        <template #title>
          <list-title>
            {{ $t("izkaznica.tab.sections.apprentices") }}
            <!-- TODO: ti si samo za admina i guess -->
            <!-- <template #end>uredi</template> -->
          </list-title>
        </template>
        <template #default>
          <list-item
            v-for="pripravnik in selectedUporabnik?.pripravniki"
            :key="pripravnik.id"
          >
            <template #title>
              {{ $t("izkaznica.tab.sections.apprentice") }}
            </template>
            <template #value>
              {{ pripravnik.ime }}
              {{ pripravnik.priimek }}
            </template>
          </list-item>
        </template>
      </list-container>

      <list-container>
        <template #title>
          <list-title>
            {{ $t("izkaznica.tab.sections.preferences") }}
          </list-title>
        </template>

        <template #default>
          <list-item>
            <template #title>
              {{ $t("izkaznica.tab.sections.language") }}
            </template>
            <template #value>
              <div
                @click="
                  useModal().openSheetModal(
                    SheetModalSelect,
                    languageSelectModalProps
                  )
                "
              >
                {{ language }}
              </div>
            </template>
          </list-item>
          <list-item>
            <template #title>
              {{ $t("izkaznica.tab.sections.theme") }}
            </template>
            <!-- Color Scheme toggle button -->
            <template #value>
              <div
                v-if="colorScheme == 'light'"
                @click="selectColorScheme('dark')"
              >
                <font-awesome-icon :icon="['fas', 'moon']" fixed-width />
              </div>
              <div v-else @click="selectColorScheme('light')">
                <font-awesome-icon :icon="['fas', 'sun']" fixed-width />
              </div>
            </template>
          </list-item>
        </template>
      </list-container>

      <button-wide
        @click="logoutUser"
        style="padding-left: 1rem; padding-right: 1rem"
      >
        {{ $t("izkaznica.tab.logout") }}
      </button-wide>
      <!--  -->
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import SheetModalSelect from "@/components/ui-components/modal/SheetModalSelect.vue"

import ImageProfile from "@/components/ui-components/image/ImageProfile.vue"
import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListTitle from "@/components/ui-components/list/ListTitle.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"
import ButtonWide from "@/components/ui-components/button/ButtonWide.vue"

import { useRoute } from "vue-router"
import { useLoginStore } from "@/stores/useLoginStore"
import { useProfileStore } from "@/stores/useProfileStore"
import { storeToRefs } from "pinia"
import { onBeforeMount, computed } from "vue"

const route = useRoute()

const { uporabnik, isLogged } = storeToRefs(useLoginStore())

let uporabnikId = ""

if (route.params.id) {
  uporabnikId = route.params.id as string
} else if (isLogged.value) {
  uporabnikId = uporabnik.value?.id as string
}

const profileStore = useProfileStore()
const { selectItem } = profileStore
const { selectedUporabnik } = storeToRefs(profileStore)

onBeforeMount(async () => {
  if (uporabnikId) {
    await selectItem(uporabnikId)
  }
})

//
// Preferences
//
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import { useModal } from "@/composables/useModal"

// Language
import i18n, { codeToLanguage } from "@/locales/i18n"
import type { Locale } from "@/locales/i18n"

const preferencesStore = usePreferencesStore()
const { language } = storeToRefs(preferencesStore)
const { selectLanguage } = preferencesStore

const t = i18n.global.t

const languageSelectModalProps = {
  header: computed(() => t("izkaznica.tab.sections.language")),
  items: codeToLanguage,
  displayItem: (item: string) => item,
  selectItem: async (item: string) => {
    selectLanguage(
      Object.keys(codeToLanguage).find(
        // @ts-ignore
        (key: string) => codeToLanguage[key] === item
      ) as Locale // Explicitly assert the type here
    )
  },
}

// Color scheme
const { colorScheme } = storeToRefs(preferencesStore)
const { selectColorScheme } = preferencesStore

const logoutUser = async () => {
  const logoutResult = await useLoginStore().logout()

  if (logoutResult) {
    window.location.reload()
  }
}
</script>
