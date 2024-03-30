import { ArrayNotEmpty, IsArray, IsString } from "class-validator"

export class InsertRevirDTO {
  @IsString({ message: "ime" })
  ime: string

  @IsArray({ message: "koordinate" })
  @ArrayNotEmpty()
  koordinate: number[][]

  @IsString({ message: "druzina" })
  druzina: string
}
