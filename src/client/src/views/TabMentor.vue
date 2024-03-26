<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>{{ $t("mentor.tab.header") }}</tab-header>
    </template>
    <template #body>
      <ion-button @click="updateItemPotrjen(mentorStore.dnevniki[0])"
        >update dnevnik</ion-button
      >
      <ion-button @click="selectItem('2019-01-02')">change datum</ion-button>

      <datepicker-horizontal
        @change="(datum) => selectItem(datum)"
      ></datepicker-horizontal>

      <TransitionGroup name="list" tag="ul">
        <li v-for="dnevnik in mentorStore.dnevniki" :key="dnevnik.id">
          <card-dnevnik-description
            :dnevnik="dnevnik"
            :show-buttons="true"
            @accept="updateItemPotrjen(dnevnik)"
            @reject="updateItemZavrnjen(dnevnik)"
          ></card-dnevnik-description>
        </li>
      </TransitionGroup>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"
import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"

import { useMentorDnevnikStore } from "@/stores/useMentorDnevnikStore"

const mentorStore = useMentorDnevnikStore()
const {
  fetchMore,
  refreshPagination,
  updateItemPotrjen,
  updateItemZavrnjen,
  selectItem,
} = mentorStore

onBeforeMount(async () => {
  await fetchMore()
})
</script>
