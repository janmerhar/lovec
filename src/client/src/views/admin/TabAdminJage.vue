<template>
  <tab-template :refresh="refreshPagination">
    <template #header>
      <tab-header>{{ $t("jaga.tab.header") }}</tab-header>
    </template>
    <template #body>
      <TransitionGroup name="list" tag="ul">
        <li v-for="jaga in jage" :key="jaga.id">
          <card-jaga
            :delete="true"
            :jaga="jaga"
            @click="
              () => {
                selectJaga(jaga)
                openModal(ModalAdminJagaDescription)
              }
            "
            @delete="deleteItem(jaga)"
          ></card-jaga>
        </li>
      </TransitionGroup>

      <tab-no-elements :elements="jage"></tab-no-elements>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import CardJaga from "@/components/CardJaga.vue"
import ModalAdminJagaDescription from "@/components/jage/ModalAdminJagaDescription.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"

import { useAdminJagaStore } from "@/stores/admin/useAdminJagaStore"
import { onBeforeMount } from "vue"
import { storeToRefs } from "pinia"
import { useModal } from "@/composables/useModal"

const adminJagaStore = useAdminJagaStore()
const { refreshPagination, selectJaga, deleteItem } = adminJagaStore
const { jage } = storeToRefs(adminJagaStore)

const { openModal } = useModal()

onBeforeMount(async () => {
  await refreshPagination()
})
</script>
