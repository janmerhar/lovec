import { defineStore } from "pinia"
import { ref } from "vue"
import type { Vplen, VplenDetails } from "@/types"

import { useRequest } from "@/composables/useRequest"

export const useVplenStore = defineStore("vplen", () => {
  const { request } = useRequest()

  const vpleniDetails = ref<VplenDetails[]>([])
  const vpleni = ref<Vplen[]>([])

  const postVplen = async () => {
    return
  }

  const getVpleni = async (stran: number): Promise<VplenDetails[] | null> => {
    const response = await request.get<VplenDetails[]>(`/vpleni/moji/${stran}`)

    if (response) {
      vpleniDetails.value = response.data as VplenDetails[]

      return response.data
    }

    return null
  }

  const getVplen = async (datum: string) => {
    const response = await request.get<Vplen[]>(`/vpleni/${datum}`)

    if (response) {
      vpleni.value = response.data as Vplen[]

      return response.data
    }

    return null
  }


  return {
    vpleniDetails,
    vpleni,
    getVpleni,
    getVplen,
  }
})
