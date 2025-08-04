import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Name of the category' })
  @IsString({ message: 'Category name must be a string!' })
  @IsNotEmpty({ message: 'Category name is required.' })
  @MinLength(3, { message: 'Category name must be at least 3 characters.' })
  @MaxLength(50, { message: 'Category name must not be longer than 50 characters.' })
  Name: string;

 
}