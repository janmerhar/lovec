import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator"

export class InsertOpazovalnicaDTO {
  @IsString()
  @IsNotEmpty()
  ime: string

  @IsNumber()
  @IsNotEmpty()
  kapaciteta: number

  @IsBoolean()
  @IsNotEmpty()
  prespanje: boolean

  @IsArray()
  @IsNotEmpty()
  koordinate: number[]
}
