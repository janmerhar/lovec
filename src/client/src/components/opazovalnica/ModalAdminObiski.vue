<template>
  <sheet-modal-template>
    <template #header>
      <sheet-modal-header>
        <font-awesome-icon
          :icon="['fas', 'bed']"
          v-if="selectedItem?.prespanje || true"
        />
        {{ selectedItem?.ime }}
        <span style="margin-left: 1rem">
          <font-awesome-icon
            @click="
              () => {
                useAlert().confirmDangerAlert(
                  $t('admin_opazovalnica.crud.delete.header'),
                  $t('admin_opazovalnica.crud.delete.message'),
                  async () => await deleteItem(selectedItem)
                )
                cancelModal()
              }
            "
            :icon="['fas', 'trash']"
            style="color: var(--ion-color-danger); cursor: pointer"
            fixed-width
          />
        </span>
      </sheet-modal-header>
    </template>

    <!--  -->
    <template #body>
      <list-container>
        <template #title>
          <list-title>
            <template #default>
              {{ $t("admin_zemljevid.obiski.sections.zasedenost") }}
            </template>
            <template #end>
              {{
                obiski.filter((obiskMap) =>
                  useDate(new Date()).isLessThan(obiskMap.konec)
                )?.length
              }}
              / {{ selectedItem?.kapaciteta }}</template
            >
          </list-title>
        </template>
        <template #default>
          <!-- Active reservations -->
          <template
            v-for="obisk in obiski.filter((obiskMap) =>
              useDate(new Date()).isLessThan(obiskMap.konec)
            )"
            :key="obisk.id"
          >
            <list-item>
              <template #title>
                <!-- Spremni v ikonce -->
                {{ obisk.uporabnik.ime }} {{ obisk.uporabnik.priimek }}
              </template>
              <template #value>
                {{ useDate(obisk.zacetek).getTime() }}
              </template>
            </list-item>
          </template>
        </template>
      </list-container>
      <button-wide
        @click="
          () => {
            cancelModal()
            redirectTo('admin_zemljevid_obiski')
          }
        "
      >
        {{ $t("admin_zemljevid.obiski.sections.zgodovina") }}</button-wide
      >
    </template>
    <!--  -->
  </sheet-modal-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"
import { storeToRefs } from "pinia"

import SheetModalTemplate from "@/components/ui-components/modal/SheetModalTemplate.vue"
import SheetModalHeader from "@/components/ui-components/modal/SheetModalHeader.vue"

import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListTitle from "@/components/ui-components/list/ListTitle.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"
import ButtonWide from "@/components/ui-components/button/ButtonWide.vue"

import { useDate } from "@/composables/useDate"
import { useOpazovalnicaStore } from "@/stores/useOpazovalnicaStore"
import { useObiskStore } from "@/stores/useObiskStore"
import { useTabNavigation } from "@/composables/useTabNavigation"
import { useModal } from "@/composables/useModal"
import { useAlert } from "@/composables/useAlert"

const opazovalnicaStore = useOpazovalnicaStore()
const { selectedItem } = storeToRefs(opazovalnicaStore)
const { deleteItem } = opazovalnicaStore
const obiskStore = useObiskStore()
const { refreshPagination } = obiskStore
const { obiski } = storeToRefs(obiskStore)
const { redirectTo } = useTabNavigation()
const { cancelModal } = useModal()
const { confimDangerAlert } = useAlert()

onBeforeMount(async () => {
  await refreshPagination()
})
</script>
