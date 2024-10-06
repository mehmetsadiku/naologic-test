import { IsOptional, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  @IsOptional()
  docId?: string;

  @IsString()
  name: string;
}
