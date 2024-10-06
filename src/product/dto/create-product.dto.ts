import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class VariantDto {
  @IsString()
  itemId: string;

  @IsString()
  description: string;

  @IsString()
  packaging: string;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  quantityOnHand: number;
}

export class CreateProductDto {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  packaging: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];

  @IsString()
  vendorId: string;
}
