import {
    IsArray,
    IsString,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
    @ApiProperty({ example: 'Mango', description: 'Name of the product' })
    @IsString()
    @IsNotEmpty()
    Name: string;

    @ApiProperty({
        description: 'Images (will be handled in controller)',
        type: 'array',
        items: { type: 'string', format: 'binary' },
    })
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value : value?.split(',')))
    @IsString({ each: true }) // Not validated directly, will be overridden by controller
    Image: string[];

    @ApiProperty({
        example: ['64d21a63fa0b9f124e5abf0d'],
        description: 'Category IDs',
        type: [String],
    })
    @Transform(({ value }) => (Array.isArray(value) ? value : value?.split(',')))
    @IsArray()
    @IsString({ each: true })
    Categories: string[];

    @ApiProperty({
        example: ['64d21a78fa0b9f124e5abf0e'],
        description: 'Subcategory IDs',
        type: [String],
    })
    @Transform(({ value }) => (Array.isArray(value) ? value : value?.split(',')))
    @IsArray()
    @IsString({ each: true })
    SubCategories: string[];

    @ApiProperty({ example: 'Fresh organic mangoes', description: 'Description' })
    @IsString()
    Description: string;

    @ApiProperty({ example: 100, description: 'Original price' })
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    OriginalPrice: number;

    @ApiProperty({ example: 80, description: 'Current price' })
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    CurrentPrice: number;

    @ApiProperty({ example: '1kg', description: 'Unit' })
    @IsString()
    Unit: string;

    @ApiProperty({ example: 50, description: 'Stock' })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    Stock: number;

    @ApiProperty({
        description: 'Extra details',
        example: [{ key: 'color', value: 'yellow' }],
        type: [Object],
    })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch {
                return [];
            }
        }
        return value;
    })
    @IsArray()
    MoreFields: any[];
}
