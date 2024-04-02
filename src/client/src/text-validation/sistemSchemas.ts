import * as yup from "yup"

export const sistemskeSpremenljivkeAddSchema = yup.object({
  PAGE_SIZE: yup.number().min(1).required(),
  JAGA_MAX_MEMBERS: yup.number().min(1).required(),
  OBISK_MAX_LENGTH: yup.number().min(1).required(),
  USER_OBISKS_MAX_LENGTH: yup.number().min(1).required(),
})
