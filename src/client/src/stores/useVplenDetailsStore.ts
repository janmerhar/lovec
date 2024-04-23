import { defineStore } from "pinia"
import { ComputedRef, computed } from "vue"
import type { VplenDetails } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { FetchFunction, usePagination } from "@/composables/usePagination"

export const useVplenDetailsStore = defineStore("vplenDetails", () => {
  const { request } = useRequest()

  const getVpleni = async (page: number): Promise<VplenDetails[]> => {
    const response = await request.get<VplenDetails[]>(`/vpleni/moji/${page}`)

    return response.data
  }

  // TODO: maybe naredi admin specific calls
  // TODO: ali pa naredim tako, da pac podam uporabnikId kot parameter
  // saj tako delujo po drugod i think

  // ker res ne vem kako bi to spreminjal
  // maybe dam admin parameter v store params
  const adminGetVpleni = async (
    uporabnikId: string,
    stran: number
  ): Promise<VplenDetails[]> => {
    const response = await request.get<VplenDetails[]>(
      `/vpleni/${uporabnikId}/${stran}`
    )

    return response.data
  }

  const { items, fetchMore, refreshPagination } = usePagination<VplenDetails>(
    // TODO: preveri zakaj moram narediti cast na FetchFunction<VplenDetails>
    getVpleni as FetchFunction<VplenDetails>,
    false
  )

  const vpleniDetailsVariable = items

  const vpleniDetails: ComputedRef<VplenDetails[]> = computed(
    () => vpleniDetailsVariable.value
  )

  return {
    vpleniDetails,
    fetchMore,
    refreshPagination,
    adminGetVpleni,
  }
})
