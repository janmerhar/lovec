import { defineStore } from "pinia"
import { computed } from "vue"
import type {
  InsertJaga,
  Jaga,
  UporabnikDetails,
  UporabnikProfile,
} from "@/types"

import { useRequest } from "@/composables/useRequest"
import { FetchFunction, usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useSelect } from "@/composables/useSelect"

export const useAdminJagaStore = defineStore("adminJaga", () => {
  const { request } = useRequest()

  const fetchJage = async (page: number): Promise<Jaga[]> => {
    const response = await request.get<Jaga[]>(`/jage/${page}`)

    return response.data
  }

  //
  // pagination
  //

  const { items, fetchMore, refreshPagination } = usePagination<Jaga>(
    // TODO: fix this
    fetchJage as FetchFunction<Jaga>,
    false
  )

  const jagaVariable = items
  const jage = computed(() => jagaVariable.value)

  //
  // CRUD
  //
  const addMember = async (
    oldVal?: Jaga,
    newVal?: UporabnikDetails | UporabnikProfile
  ): Promise<Jaga | null> => {
    if (!oldVal || !newVal) {
      return null
    }

    const response = await request.patch<Jaga>(
      `/jage/admin/jaga/${oldVal.id}/pridruzi/${newVal.id}`
    )

    return response.data
  }

  const removeMember = async (
    oldVal?: Jaga,
    newVal?: UporabnikDetails | UporabnikProfile
  ): Promise<Jaga | null> => {
    if (!oldVal || !newVal) {
      return null
    }

    const response = await request.patch<Jaga>(
      `/jage/admin/jaga/${oldVal.id}/odstrani/${newVal.id}`
    )

    return response.data
  }

  const deleteJaga = async (jaga: Jaga): Promise<boolean> => {
    const response = await request.delete<boolean>(
      `/jage/admin/jaga/${jaga.id}`
    )

    return response.data
  }

  const crud = useCRUD<Jaga>(items)
  const { updateItem, deleteItem } = crud

  // selected jaga
  const { selectItem: selectJaga, selectedItem: selectedJaga } =
    useSelect<Jaga>(null)

  return {
    jage,
    fetchMore,
    refreshPagination,
    // CRUD
    // TODO: fix this does not update
    deleteItem: deleteItem(deleteJaga),
    addMember: updateItem(addMember),
    removeMember: updateItem(removeMember),
    // Select jaga
    selectedJaga,
    selectJaga: selectJaga(),
  }
})
