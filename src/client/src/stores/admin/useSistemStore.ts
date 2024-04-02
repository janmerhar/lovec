// ja pac samo read in update imam tukaj nad enim elmentom
// moram videti kako imam moj pagination za to porihtan

import { defineStore } from "pinia"
import { computed, ComputedRef } from "vue"
import type {
  InsertSistemskeSpremenljivke,
  SistemskeSpremenljivke,
} from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"

export const useSistemStore = defineStore("sistem", () => {
  // Pagination
  const { request } = useRequest()

  const getSistemskeSpremenljivke = async (): Promise<
    SistemskeSpremenljivke[]
  > => {
    const response = await request.get<SistemskeSpremenljivke>("/spremenljivke")

    return [response.data]
  }

  const { items, fetchMore, refreshPagination } =
    usePagination<SistemskeSpremenljivke>(getSistemskeSpremenljivke, true)

  const sistemskeSpremenljivkeVariable = items
  const sistemskeSpremenljivke: ComputedRef<SistemskeSpremenljivke[]> =
    computed(() => sistemskeSpremenljivkeVariable.value)

  // CRUD

  const crud = useCRUD<SistemskeSpremenljivke>(sistemskeSpremenljivkeVariable)
  const { updateItem } = crud

  const updateSistemskeSpremenljivke = async (
    oldVal?: SistemskeSpremenljivke,
    newVal?: InsertSistemskeSpremenljivke
  ): Promise<SistemskeSpremenljivke | null> => {
    if (!oldVal || !newVal) {
      return null
    }

    const response = await request.post<SistemskeSpremenljivke>(
      "/spremenljivke",
      {
        url: "",
        data: newVal,
      }
    )

    if (response.data) {
      return response.data
    }

    return null
  }

  return {
    sistemskeSpremenljivke,
    fetchMore,
    refreshPagination,
    updateItem: updateItem(updateSistemskeSpremenljivke),
  }
})
