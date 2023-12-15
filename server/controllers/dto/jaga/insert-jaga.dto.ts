import {
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator"

export class InsertJagaDto {
  @IsString()
  @IsOptional()
  organizator: string

  @IsString()
  opis: string

  @IsArray()
  @IsString({ each: true })
  udelezeni: string[]

  @IsInt()
  maxUdelezeni: number

  @IsArray()
  @IsNumber({}, { each: true })
  lokacija: number[][]

  @IsString()
  @IsDateString()
  zacetek: string
}
