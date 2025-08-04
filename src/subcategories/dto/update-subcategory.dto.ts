import { Transform, Type } from 'class-transformer';
import { IsOptional, IsArray, IsString } from 'class-validator';

export class UpdateSubcategoryDto {
  @IsOptional()
  @IsString()
  Name?: string;

  @IsOptional()
  @IsArray()
  @Type(() => String) 
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
  Categories?: string[];
}
