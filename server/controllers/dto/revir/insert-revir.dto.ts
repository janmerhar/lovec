import { ArrayNotEmpty, IsArray, IsString } from "class-validator"

export class InsertRevirDTO {
  @IsString()
  ime: string

  @IsArray()
  @ArrayNotEmpty()
  koordinate: number[][]

  @IsString()
  druzina: string
}
