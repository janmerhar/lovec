<template>
  <tab-template
    :refresh="
      async (e) => {
        await selectItem(uporabnikId)
        e.detail.complete()
      }
    "
  >
    <template #header>
      <tab-header>{{ $t("izkaznica.tab.header") }}</tab-header>
    </template>
    <template #body>
      <image-profile> </image-profile>

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
            <template #value> (Neki jezik) </template>
          </list-item>
          <list-item>
            <template #title>
              {{ $t("izkaznica.tab.sections.theme") }}
            </template>
            <template #value> (neka tema dark/light) </template>
          </list-item>
        </template>
      </list-container>
      <!--  -->
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"

import ImageProfile from "@/components/ui-components/image/ImageProfile.vue"
import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListTitle from "@/components/ui-components/list/ListTitle.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"

import { useRoute } from "vue-router"
import { useLoginStore } from "@/stores/useLoginStore"
import { useProfileStore } from "@/stores/useProfileStore"
import { storeToRefs } from "pinia"
import { onBeforeMount } from "vue"

const route = useRoute()

const { uporabnik, isLogged } = storeToRefs(useLoginStore())

let uporabnikId = ""

if (route.params.id) {
  uporabnikId = route.params.id
} else if (isLogged.value) {
  uporabnikId = uporabnik.value.id
}

const profileStore = useProfileStore()
const { selectItem } = profileStore
const { selectedUporabnik } = storeToRefs(profileStore)

onBeforeMount(async () => {
  if (uporabnikId) {
    await selectItem(uporabnikId)
    console.log("profile", selectedUporabnik.value)
  }
})
</script>
