import { defineStore } from "pinia"
import { computed, ComputedRef } from "vue"
import type { InsertOprema, Oprema } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"

export const useOpremaStore = defineStore(
  "oprema",
  () => {
    const { request } = useRequest()

    const getOprema = async (): Promise<Oprema[]> => {
      const response = await request.get<Oprema[]>("/oprema")

      return response.data
    }

    const { items, fetchMore, refreshPagination } = usePagination<Oprema>(
      getOprema,
      true
    )

    const opremaVariable = items
    const oprema: ComputedRef<Oprema[]> = computed(() => opremaVariable.value)

    const createOprema = async (oprema: InsertOprema): Promise<Oprema> => {
      const response = await request.post<Oprema>("/oprema", {
        url: "",
        data: oprema,
      })

      return response.data
    }

    const deleteOprema = async (oprema: Oprema): Promise<boolean> => {
      const response = await request.delete<boolean>(`/oprema/${oprema.id}`)

      return response.data
    }

    const crud = useCRUD<Oprema>(opremaVariable)
    const { createItem, deleteItem } = crud

    return {
      oprema,
      fetchMore,
      refreshPagination,
      getOprema,
      deleteItem: deleteItem(deleteOprema),
      createItem: createItem(createOprema),
    }
  },
  {
    persist: true,
  }
)
