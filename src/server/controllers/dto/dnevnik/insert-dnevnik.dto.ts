import { IsIn, IsNumber, IsString, Min } from "class-validator"
import { deloDomain } from "@shared/types"

export class InsertDnevnikDTO {
  @IsString({ message: "datum" })
  datum: string

  @IsNumber({}, { message: "ure" })
  @Min(1, { message: "MIN" })
  ure: number

  @IsString({ message: "opis" })
  opis: string

  @IsString({ message: "delo" })
  @IsIn(deloDomain, { message: "DOMAIN" })
  delo: string
}
