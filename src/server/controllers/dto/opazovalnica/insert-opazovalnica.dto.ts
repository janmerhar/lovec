import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator"

export class InsertOpazovalnicaDTO {
  @IsString({ message: "ime" })
  @IsNotEmpty()
  ime: string

  @IsNumber({}, { message: "kapaciteta" })
  @IsNotEmpty()
  kapaciteta: number

  @IsBoolean({ message: "prespanje" })
  @IsNotEmpty()
  prespanje: boolean

  @IsArray({ message: "koordinate" })
  @IsNotEmpty()
  koordinate: number[]
}
