import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSubcategoryDto {
    @ApiProperty({ example: 'Mobile Phones', description: 'Name of the sub-category' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    Name: string;

    @IsArray({ message: 'Categories must be an array' })
    @IsMongoId({ each: true })
    @IsNotEmpty()
    @Transform(({ value }) => {
        if (Array.isArray(value)) return value;
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch {
                return value.split(',').map((v) => v.trim());
            }
        }
        return [];
    })
    Categories: string[];
}

