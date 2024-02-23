import { IsIn, IsNumber, IsString, Min } from "class-validator"
import { deloDomain } from "@shared/types"

export class InsertDnevnikDTO {
  @IsString()
  datum: string

  @IsNumber()
  @Min(1)
  ure: number

  @IsString()
  opis: string

  @IsString()
  @IsIn(deloDomain)
  delo: string
}
