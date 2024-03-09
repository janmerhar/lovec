import { defineStore } from "pinia"
import { ComputedRef, computed } from "vue"
import type { InsertOpazovalnica, Opazovalnica } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"

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

  const createOpazovalnica = async (
    opazovalnica: InsertOpazovalnica
  ): Promise<Opazovalnica> => {
    const response = await request.post<Opazovalnica>("/opazovalnice/", {
      url: "",
      data: opazovalnica,
    })

    return response.data
  }

  const deleteOpazovalnica = async (
    opazovalnica: Opazovalnica
  ): Promise<boolean> => {
    const response = await request.delete<boolean>(
      `/opazovalnice/admin/${opazovalnica.id}`
    )

    return response.data
  }

  const crud = useCRUD<Opazovalnica>(opazovalniceVariable)
  const { createItem, deleteItem } = crud

  return {
    opazovalnice,
    fetchMore,
    refreshPagination,
    createItem: createItem(createOpazovalnica),
    deleteItem: deleteItem(deleteOpazovalnica),
  }
})
