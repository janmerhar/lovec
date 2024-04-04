import { ref, UnwrapRef } from "vue"

export type SelectFunction = () => Promise<any>
export type FetchItemFunction = <T, U>(item: U) => Promise<T | null>

export const useSelect = <T>(defaultValue: T | null = null) => {
  const selectedItem = ref<T | null>(defaultValue)

  const selectItem = (call?: SelectFunction) => {
    return async (item: T) => {
      // TODO: fix this type cast
      // @ts-ignore
      selectedItem.value = item as UnwrapRef<T> | null

      if (call) {
        await call()
      }
    }
  }

  const deselectItem = (call?: SelectFunction) => {
    return async () => {
      selectedItem.value = null

      if (call) {
        await call()
      }
    }
  }

  const fetchItem = <U>(call: FetchItemFunction) => {
    return async (item: U | null) => {
      if (item == null) {
        selectedItem.value = null
        return
      }

      const result = (await call(item)) as T

      await selectItem()(result)
    }
  }

  // TODO
  // Vglavnem ponovim isti request, samo kako naj to naredim cim bolj effectivno
  // const refreshItem = async () => {}

  return {
    selectedItem,
    selectItem,
    deselectItem,
    fetchItem,
    // refreshItem,
  }
}
