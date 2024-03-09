import type { Ref } from "vue"
import _ from "lodash"

export type DeleteFunction<T> = (data: T) => Promise<boolean>
export const useCRUD = <T>(items: Ref<T[]>) => {

  const createItem = <I>(call: CreateFunction<I, T>) => {
    return async <T>(data: I): Promise<T | null> => {
      // in case it fails, add to queue
      const result = await call(data)

      if (!result) {
        return null
      }

      // in case it fails, add to queue
      items.value.unshift(result)

      return result as T
    }
  }

  const deleteItem = (call: DeleteFunction<T>) => {
    return async (original: T): Promise<boolean> => {
      // in case it fails, add to queue
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
    createItem,
    deleteItem,
    }
  }
