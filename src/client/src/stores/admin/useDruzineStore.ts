import { defineStore } from "pinia"
import { computed, ComputedRef } from "vue"
import type { DruzinaDetails, Druzina } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useDruzineStore = defineStore("druzine", () => {
  const { request } = useRequest()

  const getDruzine = async (): Promise<DruzinaDetails[]> => {
    const response = await request.get<DruzinaDetails[]>("/druzine")

    return response.data
  }

  const { items, fetchMore, refreshPagination } = usePagination<DruzinaDetails>(
    getDruzine,
    false
  )

  const druzineVariable = items
  const druzine: ComputedRef<DruzinaDetails[]> = computed(
    () => druzineVariable.value
  )

  return {
    druzine,
    fetchMore,
    refreshPagination,
  }
})
