// tukaj gledam za vsakega uporabnika njegove obiske
// torej glede na uporabnika (neodvisno od opazovalnice)
// tudi podpiram pagination
// in tudi delete koncanega obiska

import { defineStore, storeToRefs } from "pinia"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"

import type { Obisk } from "@/types"
import { useAlert } from "@/composables/useAlert"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useUporabnikObiskiStore = defineStore("uporabnikObiski", () => {
  const { request } = useRequest()

  const uporabnikStore = useUporabnikiStore()
  const { selectedItem: selectedUporabnik } = storeToRefs(uporabnikStore)

  // Pagination
  const getObiski = async (page?: number): Promise<Obisk[]> => {
    if (!page) {
      return []
    }

    const response = await request.get<Obisk[]>(
      `/obiski/admin/uporabnik/${selectedUporabnik.value?.id}/${page}`
    )

    return response.data
  }

  const { items, fetchMore, refreshPagination } =
    usePagination<Obisk>(getObiski)

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
    // CRUD
    deleteItem: toastDelete,
  }
})
