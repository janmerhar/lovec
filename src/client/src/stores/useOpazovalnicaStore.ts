import { defineStore } from "pinia"
import type { Opazovalnica } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { ComputedRef, computed } from "vue"

export const useOpazovalnicaStore = defineStore("opazovalnica", () => {
  const { request } = useRequest()

  const getOpazovalnice = async (): Promise<Opazovalnica[]> => {
    const response = await request.get<Opazovalnica[]>("/opazovalnice")

    return response.data
  }

  const { items, fetchMore, refreshPagination } = usePagination<Opazovalnica>(
    getOpazovalnice,
    true
  )

  const opazovalniceVariable = items

  const opazovalnice: ComputedRef<Opazovalnica[]> = computed(
    () => opazovalniceVariable.value
  )

  return {
    opazovalnice,
    fetchMore,
    refreshPagination,
  }
})
