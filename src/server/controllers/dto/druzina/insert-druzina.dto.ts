import { IsArray, IsString } from "class-validator"

export class InsertDruzinaDTO {
  @IsString({ message: "ime" })
  ime: string

  @IsArray({ message: "revirji" })
  revirji: string[] = []

  @IsArray({ message: "clani" })
  clani: string[] = []
}
