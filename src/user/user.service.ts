import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../Schemas/User.schema';
import { CreateUserDto, uploadImage } from './dto/User.dto';
import * as bcrypt from 'bcrypt'
import { uploadToCloudinary } from 'src/comman/utils/upload.utils';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async createUser(dto: CreateUserDto): Promise<User> {

        const existsUser = await this.userModel.findOne({ Email: dto.Email })
        if (existsUser) {
            throw new ConflictException("User Email already exist")
        }


        const hashPassword = await bcrypt.hash(dto.Password, await bcrypt.genSalt())

        const user = new this.userModel({
            ...dto,
            Password: hashPassword,
        });
        // console.log(user)

        return user.save();

    }

    async allUser(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async getUserById(id: string): Promise<User[]> {
        return this.userModel.find({ _id: id }).populate('Address Order CartProduct').exec();
    }
    async getUserByName(name: string): Promise<User[]> {
        return this.userModel.find({ Name: name }).exec();
    }

    async uploadImage(dto: uploadImage, file: Express.Multer.File) {
        let imageUrl = '';
        console.log(dto)

      
    }
}

