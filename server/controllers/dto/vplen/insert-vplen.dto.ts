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
  @IsArray()
  @ArrayNotEmpty()
  koordinate: number[]

  @IsString()
  @IsIn(zivalDomain)
  zival: string

  @IsNumber()
  @Min(1)
  teza: number

  @IsDateString()
  datum: string

  @ArrayMinSize(0)
  @IsIn(bolezenDomain, { each: true })
  bolezni: string[]
}
