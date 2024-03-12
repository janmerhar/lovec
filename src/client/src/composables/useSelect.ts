import { ref, UnwrapRef } from "vue"

/*
    Hocem nek composable, ki spreminja selected item
    - neki kar 

*/

export type SelectFunction = () => Promise<any>

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

  return {
    selectedItem,
    selectItem,
    deselectItem,
  }
}
