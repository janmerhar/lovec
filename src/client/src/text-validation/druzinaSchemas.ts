import * as yup from "yup"

export const druzinaAddSchema = yup.object({
  ime: yup.string().required(),
})
