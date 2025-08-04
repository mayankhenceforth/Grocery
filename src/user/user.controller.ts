import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto, uploadImage } from './dto/User.dto';
import { User } from 'src/Schemas/User.schema';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { PassThrough } from 'stream';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        message: 'User created successfully',
        data: {
          _id: '64f5d7338c7dc2289a7c543a',
          Name: 'John Doe',
          Email: 'john@example.com',
          PhoneNumber: '9876543210',
          Password: '********',
          ProfilePicture: null,
          role: 'user',
        },
      },
    },
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; data: User }> {
    const newUser = await this.userService.createUser(createUserDto);
    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    schema: {
      example: {
        message: 'All user list',
        data: [
          {
            _id: '64f5d7338c7dc2289a7c543a',
            Name: 'John Doe',
            Email: 'john@example.com',
            PhoneNumber: '9876543210',
            Password: '********',
            ProfilePicture: null,
            role: 'user',
          },
        ],
      },
    },
  })
  async allUser(): Promise<{ message: string; data: User[] }> {
    const result = await this.userService.allUser();
    return {
      message: 'All user list',
      data: result,
    };
  }

  @Get('id')
  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiQuery({ name: 'id', required: true, example: '64f5d7338c7dc2289a7c543a' })
  @ApiResponse({
    status: 200,
    description: 'User found or not',
    schema: {
      example: {
        _id: '64f5d7338c7dc2289a7c543a',
        Name: 'John Doe',
        Email: 'john@example.com',
        PhoneNumber: '9876543210',
        role: 'user',
      },
    },
  })
  async getUserById(@Query('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user || { message: 'User not found' };
  }

  @Get('name')
  @ApiOperation({ summary: 'Find a user by name' })
  @ApiQuery({ name: 'name', required: true, example: 'John Doe' })
  @ApiResponse({
    status: 200,
    description: 'User found or not',
    schema: {
      example: {
        _id: '64f5d7338c7dc2289a7c543a',
        Name: 'John Doe',
        Email: 'john@example.com',
        PhoneNumber: '9876543210',
        role: 'user',
      },
    },
  })
  async getUserByName(@Query('name') name: string) {
    const user = await this.userService.getUserByName(name);
    return user || { message: 'User not found' };
  }


  @Post('image')
@ApiOperation({ summary: 'Upload user image with data' })
@ApiConsumes('multipart/form-data')
@UseInterceptors(FileInterceptor('ProfilePicture', multerConfig))
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      Email: {
        type: 'string',
        example: 'john@example.com',
      },
      profilePicture: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})

async uploadImage(
  @Body() dto: uploadImage,
  @UploadedFile() file: Express.Multer.File,
) {
  console.log('📥 DTO:', dto);
  console.log('📤 FILE:', file?.originalname);
  return this.userService.uploadImage(dto, file);
}

}
