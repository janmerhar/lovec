<template>
  <sheet-modal-template>
    <template #header>
      <sheet-modal-header>
        {{ $t("oprema.crud.create.header") }}
      </sheet-modal-header>
    </template>

    <!--  -->
    <template #body> </template>
    <infinite-scroll-component
      :scroll="scroll"
      v-if="true"
    ></infinite-scroll-component>
    <!--  -->
  </sheet-modal-template>
</template>

<script setup lang="ts">
import SheetModalTemplate from "@/components/ui-components/modal/SheetModalTemplate.vue"
import SheetModalHeader from "@/components/ui-components/modal/SheetModalHeader.vue"

defineProps({
  scroll: {
    type: Function,
    default: () => {
      return null
    },
  },
  isRefreshable: {
    type: Boolean,
    default: true,
  },
})
</script>
