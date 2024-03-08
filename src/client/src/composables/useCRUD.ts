import type { Ref } from "vue"
import _ from "lodash"

export type DeleteFunction<T> = (data: T) => Promise<boolean>
export const useCRUD = <T>(items: Ref<T[]>) => {
  const deleteItem = (call: DeleteFunction<T>) => {
    return async (original: T): Promise<boolean> => {
      const result = await call(original)

      if (!result) {
        return false
      }

      // removing deleted item
      items.value = items.value.filter((item) => !_.isEqual(item, original))

      return true
    }
  }


  return {
    deleteItem,
    }
  }
