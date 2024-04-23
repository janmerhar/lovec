import { defineStore } from "pinia"

import { useRequest } from "@/composables/useRequest"
import type { InsertRevir, Revir } from "@/types"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"

export const useRevirStore = defineStore("revir", () => {
  const { request } = useRequest()

  const getRevirji = async (): Promise<Revir[]> => {
    const response = await request.get<Revir[]>("/revirji")

    return response.data
  }

  // Pagination
  const { items, fetchMore, refreshPagination } = usePagination<Revir>(
    getRevirji,
    true
  )

  // CRUD
  const createRevir = async (revir: InsertRevir): Promise<Revir> => {
    const response = await request.post<Revir>("/revirji", {
      url: "",
      data: revir,
    })

    return response.data
  }

  const { createItem } = useCRUD<Revir>(items)

  return {
    // Pagination
    items,
    fetchMore,
    refreshPagination,
    // CRUD
    createItem: createItem(createRevir),
  }
})
