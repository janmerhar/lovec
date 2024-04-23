import { defineStore } from "pinia"
import { ComputedRef, computed, ref } from "vue"
import type { InsertVplen, Vplen, VplenDetails } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useVplenStore = defineStore("vplen", () => {
  const { request } = useRequest()

  const selectedVplenDetails = ref<VplenDetails | null>(null)

  const getVplenDetails = async (datum: string): Promise<Vplen[]> => {
    const response = await request.get<Vplen[]>(`/vpleni/${datum}`)

    return response.data
  }

  const getCurrentVplenDetails = async (): Promise<Vplen[]> => {
    if (!selectedVplenDetails.value) {
      return []
    }

    const result = await getVplenDetails(selectedVplenDetails.value.datum)

    return result
  }

  //
  // Pagination
  //

  const { items, fetchMore, refreshPagination } = usePagination<Vplen>(
    getCurrentVplenDetails,
    true
  )

  const vpleniVariable = items
  const vpleni: ComputedRef<Vplen[]> = computed(() => vpleniVariable.value)

  // TODO: naredi tako, da lahko podam samo datum
  // TODO: naredi tudi fetch samo za en datum

  const setVplenDetails = async (newVplenDetails: VplenDetails) => {
    selectedVplenDetails.value = newVplenDetails

    await refreshPagination()
  }

  //
  // CRUD
  //

  const createVplen = async (vplen: InsertVplen): Promise<Vplen> => {
    const response = await request.post<Vplen>("/vpleni", {
      url: "",
      data: vplen,
    })

    return response.data
  }

  const deleteVplen = async (vplen: Vplen): Promise<boolean> => {
    const response = await request.delete<boolean>(`/vpleni/${vplen.id}`)

    return response.data
  }

  const crud = useCRUD<Vplen>(vpleniVariable)
  const { createItem, deleteItem } = crud

  const toastDelete = async (vplen: Vplen) => {
    const call = async () => await deleteItem(deleteVplen)(vplen)

    const { successToastAction } = useAlert()

    await successToastAction(
      call,
      t("vplenDatum.crud.delete.success", { name: vplen.zival })
    )
  }
  return {
    vpleni,
    setVplenDetails,
    fetchMore,
    refreshPagination,
    createItem: createItem(createVplen),
    deleteItem: toastDelete,
  }
})
