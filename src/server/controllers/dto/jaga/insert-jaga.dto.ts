import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator"

export class InsertJagaDto {
  @IsString({ message: "organizator" })
  @IsOptional()
  organizator: string

  @IsString({ message: "naziv" })
  naziv: string

  @IsString({ message: "opis" })
  opis: string

  @IsArray({ message: "udelezeni" })
  @IsString({ each: true })
  @IsOptional()
  udelezeni: string[]

  @IsArray({ message: "lokacija" })
  @IsNumber({}, { each: true })
  lokacija: number[][]

  @IsString({ message: "zacetek" })
  @IsDateString({}, { message: "zacetek" })
  zacetek: string
}
