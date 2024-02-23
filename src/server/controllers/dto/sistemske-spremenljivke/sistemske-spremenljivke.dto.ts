import { IsNumber, Min } from "class-validator"

export class SistemskeSpremenljivkeDTO {
  @IsNumber()
  @Min(1)
  PAGE_SIZE: number

  @IsNumber()
  @Min(1)
  JAGA_MAX_MEMBERS: number

  @IsNumber()
  @Min(1)
  OBISK_MAX_LENGTH: number

  @IsNumber()
  @Min(1)
  USER_OBISKS_MAX_LENGTH: number
}
