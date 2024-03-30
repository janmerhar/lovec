import { IsOptional, IsString } from "class-validator"

export class InsertObiskDTO {
  @IsString({ message: "opazovalnica" })
  opazovalnica: string

  @IsString({ message: "zacetek" })
  @IsOptional()
  zacetek?: string
}
