import { defineStore, storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { useRequest } from "@/composables/useRequest"
import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
import { usePagination } from "@/composables/usePagination"
import type { Oprema } from "@/types"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"

import i18n from "@/locales/i18n"
const { t } = i18n.global
export const useUporabnikOpremaStore = defineStore("uporabnikOprema", () => {
  const { request } = useRequest()

  const uporabnikStore = useUporabnikiStore()
  const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

  const getUporabnikOprema = async (): Promise<Oprema[]> => {
    if (!uporabnik?.value) return []

    const response = await request.get<Oprema[]>(
      `/oprema/${uporabnik?.value.id}`
    )

    return response.data
  }

  // Pagination
  const { items, fetchMore, refreshPagination } = usePagination<Oprema>(
    getUporabnikOprema,
    true
  )

  // CRUD
  const deleteOprema = async (oprema: Oprema): Promise<boolean> => {
    if (!uporabnik.value) return false

    const response = await request.delete<boolean>(
      `/oprema/${uporabnik.value.id}/${oprema.id}`
    )

    return response.data
  }

  const { deleteItem } = useCRUD<Oprema>(items)

  const toastDelete = async (oprema: Oprema) => {
    const call = async () => await deleteItem(deleteOprema)(oprema)

    const { successToastAction } = useAlert()

    await successToastAction(
      call,
      t("admin_uporabnik_oprema.crud.delete.success", { name: oprema.naziv })
    )
  }
  return {
    // Select
    items,
    fetchMore,
    refreshPagination,
    // CRUD
    deleteItem: toastDelete,
  }
})
