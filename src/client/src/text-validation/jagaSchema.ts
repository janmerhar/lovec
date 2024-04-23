import * as yup from "yup"

export const jagaAddSchema = yup.object({
  organizator: yup.string(),
  naziv: yup.string().required(),
  opis: yup.string().required(),
  udelezeni: yup.array(yup.string()),
  lokacija: yup.array(yup.array(yup.number())) /*.required()*/,
  zacetek: yup.string() /*.required()*/,
})
