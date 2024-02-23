import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator"

export class InsertJagaDto {
  @IsString()
  @IsOptional()
  organizator: string

  @IsString()
  naziv: string

  @IsString()
  opis: string

  @IsArray()
  @IsString({ each: true })
  udelezeni: string[]

  @IsArray()
  @IsNumber({}, { each: true })
  lokacija: number[][]

  @IsString()
  @IsDateString()
  zacetek: string
}
