import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSubcategoryDto {
    @ApiProperty({ example: 'Mobile Phones', description: 'Name of the sub-category' })
    @IsString({ message: 'Sub-category name must be a string!' })
    @IsNotEmpty({ message: 'Sub-category name is required.' })
    @MinLength(3, { message: 'Sub-category name must be at least 3 characters.' })
    @MaxLength(50, { message: 'Sub-category name must not be longer than 50 characters.' })
    Name: string;


    @ApiProperty({ example: 'https://res.cloudinary.com/.../image.jpg', description: 'Main image URL for the sub-category' })
    @IsString({ message: 'Image URL must be a string' })
    @IsNotEmpty({ message: 'Image is required.' })
    Image: string;

    @ApiProperty({
        example: ['64c456cbe4b0c7f123456789'],
        description: 'Array of parent category ObjectIds',
        type: [String],
    })
    @IsArray({ message: 'Categories must be an array' })
    @IsMongoId({ each: true, message: 'Each category must be a valid MongoDB ObjectId' })
    @IsNotEmpty({ message: 'At least one category ID is required' })
    Categories: string[];

    @ApiProperty({
        example: ['https://res.cloudinary.com/.../banner1.jpg', 'https://res.cloudinary.com/.../banner2.jpg'],
        required: false,
        description: 'Optional array of banner image URLs',
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    BannerImage?: string[];
}
