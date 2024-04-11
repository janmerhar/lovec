<template>
  <tab-template>
    <template #header>
      <tab-header>
        {{ $t("admin_uporabnik_id.tab.header") }} {{ selectedItem?.ime }}
        {{ selectedItem?.priimek }}
      </tab-header>
    </template>
    <template #body>
      <image-profile :slika="selectedItem?.slika"> </image-profile>

      <!--  -->
      <list-container>
        <template #title>
          <list-title>
            {{ $t("admin_uporabnik_id.tab.sections.personalData") }}
            <template #end>
              <text-edit>
                {{ $t("admin_uporabnik_id.crud.update.button") }}
              </text-edit>
            </template>
          </list-title>
        </template>

        <template #default>
          <list-item>
            <template #title>
              {{ $t("admin_uporabnik_id.crud.categories.role") }}
            </template>
            <template #value>
              {{ selectedItem?.role }}
            </template>
          </list-item>

          <list-item
            v-if="selectedItem?.role == 'pripravnik'"
            @click="
              redirectTo('admin_uporabnik_id', { id: selectedItem?.mentor.id })
            "
          >
            <template #title>
              {{ $t("admin_uporabnik_id.crud.categories.mentor") }}
            </template>
            <template #value>
              {{ selectedItem?.mentor?.ime }}
              {{ selectedItem?.mentor?.priimek }}
            </template>
          </list-item>

          <list-item
            v-if="selectedItem?.role != 'admin'"
            @click="
              redirectTo('admin_druzina_id', { id: selectedItem?.druzina?.id })
            "
          >
            <template #title>
              {{ $t("admin_uporabnik_id.crud.categories.druzina") }}
            </template>
            <template #value>
              {{ selectedItem?.druzina?.ime }}
            </template>
          </list-item>
        </template>
      </list-container>

      <list-container v-if="selectedItem?.role == 'lovec'">
        <template #title>
          <list-title>
            {{ $t("admin_uporabnik_id.tab.sections.apprentices") }}
            <template #end>
              <text-edit>
                {{ $t("admin_uporabnik_id.crud.update.button") }}
              </text-edit>
            </template>
          </list-title>
        </template>
        <template #default>
          <list-item
            v-for="pripravnik in selectedItem?.pripravniki"
            :key="pripravnik.id"
            @click="redirectTo('admin_uporabnik_id', { id: pripravnik.id })"
          >
            <template #title>
              {{ $t("admin_uporabnik_id.tab.sections.apprentice") }}
            </template>
            <template #value>
              {{ pripravnik.ime }}
              {{ pripravnik.priimek }}
            </template>
          </list-item>
        </template>
      </list-container>

      <list-container v-if="selectedItem?.role != 'admin'">
        <template #title>{{
          $t("admin_uporabnik_id.tab.sections.pages")
        }}</template>
        <template #default>
          <list-item @click="redirectTo('admin_uporabnik_jage')">
            <template #title>
              {{ $t("admin_uporabnik_id.tab.sections.jage") }}
            </template>
          </list-item>

          <!-- Dnevniki za pripravnika -->
          <list-item
            v-if="selectedItem?.role == 'pripravnik'"
            @click="redirectTo('admin_pripravnik_dnevniki')"
          >
            <template #title>
              {{ $t("admin_uporabnik_id.tab.sections.dnevniki_pripravnik") }}
            </template>
          </list-item>

          <!-- Dnevniki za mentorja -->
          <list-item
            v-if="selectedItem?.role == 'lovec'"
            @click="redirectTo('admin_mentor_dnevniki')"
          >
            <template #title>
              {{ $t("admin_uporabnik_id.tab.sections.dnevniki_mentor") }}
            </template>
          </list-item>

          <list-item>
            <template #title>
              {{ $t("admin_uporabnik_id.tab.sections.obiski") }}
            </template>
          </list-item>

          <list-item @click="redirectTo('admin_uporabnik_vpleni')">
            <template #title>
              {{ $t("admin_uporabnik_id.tab.sections.vpleni") }}
            </template>
          </list-item>

          <list-item @click="redirectTo('admin_uporabnik_oprema')">
            <template #title>
              {{ $t("admin_uporabnik_id.tab.sections.oprema") }}
            </template>
          </list-item>
        </template>
      </list-container>

      <template v-if="selectedItem?.id == uporabnik?.id">
        <list-container>
          <template #title>
            <list-title>
              {{ $t("admin_uporabnik_id.tab.sections.preferences") }}
              <template #end>
                <text-edit>
                  {{ $t("admin_uporabnik_id.crud.update.button") }}
                </text-edit>
              </template>
            </list-title>
          </template>

          <template #default>
            <list-item>
              <template #title>
                {{ $t("admin_uporabnik_id.tab.sections.language") }}
              </template>
              <template #value> (Neki jezik) </template>
            </list-item>
            <list-item>
              <template #title>
                {{ $t("admin_uporabnik_id.tab.sections.theme") }}
              </template>
              <template #value> (neka tema dark/light) </template>
            </list-item>
          </template>
        </list-container>

        <button-wide
          @click="logoutUser"
          style="padding-left: 1rem; padding-right: 1rem"
        >
          {{ $t("admin_uporabnik_id.tab.logout") }}
        </button-wide>
      </template>
      <!--  -->
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"

import ImageProfile from "@/components/ui-components/image/ImageProfile.vue"
import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListTitle from "@/components/ui-components/list/ListTitle.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"
import ButtonWide from "@/components/ui-components/button/ButtonWide.vue"
import TextEdit from "@/components/ui-components/text/TextEdit.vue"

import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
import { useRoute } from "vue-router"
import { useLoginStore } from "@/stores/useLoginStore"
import { storeToRefs } from "pinia"
import { useTabNavigation } from "@/composables/useTabNavigation"

const { redirectTo } = useTabNavigation()

const route = useRoute()

const { uporabnik, isLogged } = storeToRefs(useLoginStore())

let uporabnikId = ""

if (route.params.id) {
  uporabnikId = route.params.id as string
} else if (isLogged.value) {
  uporabnikId = uporabnik.value?.id as string
}

const uporabnikStore = useUporabnikiStore()
const { fetchItem } = uporabnikStore
const { selectedItem } = storeToRefs(uporabnikStore)

onBeforeMount(async () => {
  if (uporabnikId) {
    await fetchItem(uporabnikId)
  }
})

const logoutUser = async () => {
  const logoutResult = await useLoginStore().logout()

  if (logoutResult) {
    window.location.reload()
  }
}
</script>
