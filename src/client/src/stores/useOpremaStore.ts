import { defineStore } from "pinia"
import { ref } from "vue"
import type { APIResponse, Oprema } from "@/types"

import { useRequest } from "@/composables/useRequest"

export const useOpremaStore = defineStore("oprema", () => {
  const { request } = useRequest()

  const oprema = ref<Oprema[]>([])

  const getOprema = async (): Promise<Oprema[] | null> => {
    const response = await request.get<Oprema[]>("/oprema")

    if (response) {
      oprema.value = response.data as Oprema[]

      return response.data
    }

    return null
  }

  const deleteOprema = async (opremaId: string): Promise<boolean> => {
    const response = await request.delete<boolean>(`/oprema/${opremaId}`)

    if (response) {
      return response.data
    }

    return false
  }


  return {
    oprema,
    getOprema,
    deleteOprema,
  }
})
