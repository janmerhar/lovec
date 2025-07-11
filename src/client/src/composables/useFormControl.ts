import { Ref } from "vue"

import { useModal } from "@/composables/useModal"
import { useAlert } from "@/composables/useAlert"

export const useFormControl = (form: Ref<HTMLFormElement | null>) => {
  const submitForm = async <T>(
    call: (el: T) => Promise<any>,
    data: T,
    message?: string
  ): Promise<undefined> => {
    // @ts-ignore
    const success = await form.value?.validate()

    if (!success.valid) {
      return
    }

    const result = await call(data)

    if (result) {
      await useModal().cancelModal()

      if (message) {
        useAlert().successToast(message)
      }
    }
  }

  return {
    submitForm,
  }
}
