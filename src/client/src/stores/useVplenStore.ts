import { defineStore } from "pinia"
import { ComputedRef, computed, ref } from "vue"
import type { Vplen, VplenDetails } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"

export const useVplenStore = defineStore("vplen", () => {
  const { request } = useRequest()

  const selectedVplenDetails = ref<VplenDetails | null>(null)

  const getVplenDetails = async (datum: string): Promise<VplenDetails[]> => {
    const response = await request.get<VplenDetails[]>(`/vpleni/${datum}`)

    return response.data
  }

  const getCurrentVplenDetails = async (): Promise<VplenDetails[]> => {
    if (!selectedVplenDetails.value) {
      return []
    }

    const result = await getVplenDetails(selectedVplenDetails.value.datum)

    return result
  }

  //
  // Pagination
  //

  const { items, fetchMore, refreshPagination } = usePagination<VplenDetails>(
    getCurrentVplenDetails,
    true
  )

  const vpleniVariable = items
  const vpleni: ComputedRef<VplenDetails[]> = computed(
    () => vpleniVariable.value
  )

  const setVplenDetails = async (newVplenDetails: VplenDetails) => {
    selectedVplenDetails.value = newVplenDetails

    await refreshPagination()
  }

  return {
    vpleni,
    setVplenDetails,
    fetchMore,
    refreshPagination,
  }
})
