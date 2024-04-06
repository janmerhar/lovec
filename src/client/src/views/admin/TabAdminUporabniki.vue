<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>{{ $t("admin_uporabniki.tab.header") }}</tab-header>
    </template>
    <template #body>
      <input-label-horizontal>
        <template #input>
          <Field
            name="search"
            type="text"
            v-model="search"
            @keyup.enter="searchItem(search)"
            :placeholder="$t('admin_uporabniki.tab.search')"
          />
        </template>
        <template #right>
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            fixed-width
            @click="searchItem(search)"
            style="cursor: pointer"
          />
        </template>
        <template #error>
          <ErrorMessage name="search" />
        </template>
      </input-label-horizontal>

      <TransitionGroup name="list" tag="ul">
        <li v-for="uporabnik in uporabniki" :key="uporabnik.id">
          <card-uporabnik
            :uporabnik="uporabnik"
            @izbrisi="
              useAlert().confirmDangerAlert(
                $t('admin_uporabniki.tab.crud.delete.header'),
                $t('admin_uporabniki.tab.crud.delete.message'),
                async () => await deleteItem(uporabnik)
              )
            "
            @click="redirectTo('admin_uporabnik_id', { id: uporabnik.id })"
          ></card-uporabnik>
        </li>
      </TransitionGroup>

      <tab-no-elements :elements="uporabniki"></tab-no-elements>

      <fab-button-add @click.prevent="() => {}"></fab-button-add>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import CardUporabnik from "@/components/admin/uporabnik/CardUporabnik.vue"
import InputLabelHorizontal from "@/components/ui-components/input/InputLabelHorizontal.vue"
import { Form, Field, ErrorMessage } from "vee-validate"

import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
import { storeToRefs } from "pinia"
import { useAlert } from "@/composables/useAlert"
import { useTabNavigation } from "@/composables/useTabNavigation"
const uporabnikiStore = useUporabnikiStore()

const { fetchMore, refreshPagination, deleteItem, searchItem } = uporabnikiStore
const { uporabniki } = storeToRefs(uporabnikiStore)
const { redirectTo } = useTabNavigation()

const search = ref<string>("")

onBeforeMount(async () => {
  await fetchMore()
})
</script>
