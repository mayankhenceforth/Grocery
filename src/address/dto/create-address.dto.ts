import { IsString, IsOptional, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: '123 Main Street', description: 'Primary address line' })
  @IsString()
  @IsNotEmpty()
  AddressLine1: string;

  @ApiProperty({ example: 'Apt 4B', required: false, description: 'Secondary address line' })
  @IsOptional()
  @IsString()
  AddressLine2?: string;

  @ApiProperty({ example: 'New York', description: 'City name' })
  @IsString()
  @IsNotEmpty()
  City: string;

  @ApiProperty({ example: '110001', description: 'Postal or zip code' })
  @IsString()
  @IsNotEmpty()
  PinCode: string; // recommend using string instead of number

  @ApiProperty({ example: 'USA', description: 'Country name' })
  @IsString()
  @IsNotEmpty()
  Country: string;

  @ApiProperty({ example: true, required: false, description: 'Active status of the address' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

