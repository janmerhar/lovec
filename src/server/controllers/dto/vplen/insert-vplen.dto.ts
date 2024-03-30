import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsIn,
  IsNumber,
  IsString,
  Min,
} from "class-validator"
import { zivalDomain, bolezenDomain } from "@shared/types"

export class InsertVplenDTO {
  @IsArray({ message: "koordinate" })
  @ArrayNotEmpty()
  koordinate: number[]

  @IsString({ message: "zival" })
  @IsIn(zivalDomain)
  zival: string

  @IsNumber({}, { message: "teza" })
  @Min(1, { message: "MIN" })
  teza: number

  @IsDateString({}, { message: "datum" })
  datum: string

  @ArrayMinSize(0)
  @IsIn(bolezenDomain, { each: true })
  bolezni: string[]
}
