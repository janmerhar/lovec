import * as yup from "yup"

import { opremaTipDomain } from "@/types"

export const opremaAddSchema = yup.object({
  naziv: yup.string().required(),
  // TODO: tebe moram manualno spremeniti message v localised
  // saj bodo vsi v slovenscini
  tip: yup.string().oneOf(opremaTipDomain).required(),
  stanje: yup.string().required(),
  datum: yup.date(),
})
