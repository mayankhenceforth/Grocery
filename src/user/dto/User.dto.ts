import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsBoolean,
  Length,
  MaxLength,
  MinLength,
  IsNumber,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString({ message: 'User name must be a string!' })
  @IsNotEmpty({ message: 'User name is required.' })
  @MinLength(3, { message: 'User name must be at least 3 characters.' })
  @MaxLength(50, { message: 'User name must not be longer than 50 characters.' })
  Name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Valid email address' })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  Email: string;

  @ApiProperty({ example: '9876543210', description: '10-digit mobile number' })
  @IsNotEmpty({ message: 'Mobile number is required.' })
  @IsNumberString({}, { message: 'Mobile number must contain only digits.' })
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits.' })
  PhoneNumber: string;

  @ApiProperty({ example: 'Passw0rd!', description: 'Password between 8-12 characters' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @MaxLength(12, { message: 'Password must not be longer than 12 characters.' })
  Password: string;

  @ApiProperty({ example: 'https://cdn.example.com/image.jpg', required: false, description: 'Optional profile picture URL' })
  @IsString()
  @IsOptional()
  ProfilePicture?: string;

  @ApiProperty({ example: 'admin', required: false, description: 'User role (admin or user)' })
  @IsString()
  @IsOptional()
  @IsIn(['admin', 'user'], { message: 'Role must be either admin or user' })
  role?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com', description: 'Registered email address' })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  Email: string;

  @ApiProperty({ example: 'Passw0rd!', description: 'Password between 8-12 characters' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @MaxLength(12, { message: 'Password must not be longer than 12 characters.' })
  Password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'john@example.com', description: 'Email to send password reset OTP' })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  Email: string;
}

export class OtpVerificationDto {
  @ApiProperty({ example: 'john@example.com', description: 'Email used for verification' })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  Email: string;

  @ApiProperty({ example: 1234, description: 'OTP sent to the user email' })
  @IsNotEmpty({ message: 'Enter OTP' })
  @IsNumber({}, { message: 'OTP must be a number.' })
  otp: number;
}

export class NewPasswordDto {
  @ApiProperty({ example: 'john@example.com', description: 'Registered email address' })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  Email: string;

  @ApiProperty({ example: 'NewPass123!', description: 'New password (8-12 characters)' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @MaxLength(12, { message: 'Password must not be longer than 12 characters.' })
  Password: string;
}
