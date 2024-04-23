import * as yup from "yup"

export const opazovalnicaAddSchema = yup.object({
  ime: yup.string().required(),
  kapaciteta: yup.number().min(1).required(),
  prespanje: yup.boolean().required(),
  koordinate: yup.array().of(yup.number()).length(2),
})
