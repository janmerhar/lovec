import * as yup from "yup"

import { zivalDomain, bolezenDomain } from "@/types"

export const vplenAddSchema = yup.object({
  koordinate: yup.array().of(yup.number()).length(2) /*.required()*/,
  zival: yup.string().oneOf(zivalDomain).required(),
  teza: yup.number().min(1).required(),
  datum: yup.date() /*.required()*/,
  bolezni: yup.array().of(yup.string().oneOf(bolezenDomain)).required(),
})
