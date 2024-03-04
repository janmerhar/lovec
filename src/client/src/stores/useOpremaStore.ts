import { defineStore } from "pinia"
import { computed, ComputedRef } from "vue"
import type { Oprema } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"

export const useOpremaStore = defineStore(
  "oprema",
  () => {
    const { request } = useRequest()

    const getOprema = async (): Promise<Oprema[]> => {
      const response = await request.get<Oprema[]>("/oprema")

      return response.data
    }

    const deleteOprema = async (opremaId: string): Promise<boolean> => {
      const response = await request.delete<boolean>(`/oprema/${opremaId}`)

      if (response) {
        return response.data
      }

      return false
    }

    const { items, fetchMore, refreshPagination } = usePagination<Oprema>(
      getOprema,
      true
    )

    //   const postOprema = async (naziv: string, tip: string, stanje: string) => {}

    //   const adminGetOprema = async (uporabnikId: string) => {}

    //   const adminDeleteOprema = async (uporabnikId: string, opremaId: string) => {}

    const opremaVariable = items
    const oprema: ComputedRef<Oprema[]> = computed(() => opremaVariable.value)

    return {
      oprema,
      opremaVariable,
      fetchMore,
      refreshPagination,
      getOprema,
      deleteOprema,
      // postOprema,
      // adminGetOprema,
      // adminDeleteOprema,
    }
  },
  {
    persist: true,
  }
)
