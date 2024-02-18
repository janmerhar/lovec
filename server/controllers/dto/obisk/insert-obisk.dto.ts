import { IsOptional, IsString } from "class-validator"

export class InsertObiskDTO {
  @IsString()
  opazovalnica: string

  @IsString()
  @IsOptional()
  zacetek?: string
}
