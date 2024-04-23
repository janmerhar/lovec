import * as yup from "yup"

export const revirAddSchema = yup.object({
  ime: yup.string().required(),
  koordinate: yup.array().of(yup.array().of(yup.number())).min(2),
  druzina: yup.string(),
})
