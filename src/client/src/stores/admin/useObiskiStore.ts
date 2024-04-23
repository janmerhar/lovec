import { defineStore, storeToRefs } from "pinia"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useSelect } from "@/composables/useSelect"
import { useDate } from "@/composables/useDate"
import { useCRUD } from "@/composables/useCRUD"

import { useOpazovalnicaStore } from "@/stores/useOpazovalnicaStore"

import type { Obisk } from "@/types"
import { useAlert } from "@/composables/useAlert"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useObiskiStore = defineStore("adminObiski", () => {
  const { request } = useRequest()

  const { selectedItem: selectedOpazovalnica } = storeToRefs(
    useOpazovalnicaStore()
  )

  const { selectedItem: selectedDatum, selectItem } = useSelect<string | null>(
    useDate(new Date()).isoDate()
  )

  // Pagination
  const getObiski = async (): Promise<Obisk[]> => {
    const response = await request.get<Obisk[]>(
      `/obiski/opazovalnica/${selectedOpazovalnica.value?.id}/${selectedDatum.value}`
    )

    return response.data
  }

  const { items, fetchMore, refreshPagination } = usePagination<Obisk>(
    getObiski,
    true
  )

  // CRUD
  const { deleteItem } = useCRUD<Obisk>(items)

  const deleteObisk = async (obisk: Obisk) => {
    const response = await request.delete<boolean>(
      `/obiski/admin/obisk/${obisk.id}`
    )

    return response.data
  }

  const toastDelete = async (obisk: Obisk) => {
    const call = async () => await deleteItem(deleteObisk)(obisk)

    const { successToastAction } = useAlert()

    await successToastAction(
      call,
      t("admin_zemljevid_obiski.crud.delete.success")
    )
  }
  return {
    // Pagination
    items,
    fetchMore,
    refreshPagination,
    // Select
    selectItem: selectItem(refreshPagination),
    // CRUD
    deleteItem: toastDelete,
  }
})
