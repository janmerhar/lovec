import { defineStore } from "pinia"
import { ref } from "vue"
import type { Oprema } from "@/types"

import { useRequest } from "@/composables/useRequest"

export const useOpremaStore = defineStore("oprema", () => {
  const { request } = useRequest()

  const oprema = ref<Oprema[]>([])

  const getOprema = async (): Promise<Oprema[]> => {
    const response = await request.get<Oprema[]>("/oprema")

    oprema.value = response.data as Oprema[]

    return response.data
  }

  const deleteOprema = async (opremaId: string): Promise<boolean> => {
    const response = await request.delete<boolean>(`/oprema/${opremaId}`)

    if (response) {
      return response.data
    }

    return false
  }

  //   const postOprema = async (naziv: string, tip: string, stanje: string) => {}

  //   const adminGetOprema = async (uporabnikId: string) => {}

  //   const adminDeleteOprema = async (uporabnikId: string, opremaId: string) => {}

  return {
    oprema,
    getOprema,
    deleteOprema,
    // postOprema,
    // adminGetOprema,
    // adminDeleteOprema,
  }
  // TODO: make it perssistant
})
