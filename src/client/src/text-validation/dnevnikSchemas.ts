import * as yup from "yup"

import { deloDomain } from "@/types"

export const dnevnikAddSchema = yup.object({
  // TODO: FIX THIS to required
  datum: yup.date(),
  ure: yup.number().min(1).required(),
  opis: yup.string().required(),
  delo: yup.string().oneOf(deloDomain).required(),
})
