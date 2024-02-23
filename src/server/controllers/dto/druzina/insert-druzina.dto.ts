import { IsArray, IsString } from "class-validator"

export class InsertDruzinaDTO {
  @IsString()
  ime: string

  @IsArray()
  revirji: string[] = []

  @IsArray()
  clani: string[] = []
}
