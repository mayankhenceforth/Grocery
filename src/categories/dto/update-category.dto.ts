import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
      @IsString({ message: 'User name must be a string!' })
      @IsNotEmpty({ message: 'User name is required.' })
      @MinLength(3, { message: 'User name must be at least 3 characters.' })
      @MaxLength(50, { message: 'User name must not be longer than 50 characters.' })
      Name: string;
    
}
