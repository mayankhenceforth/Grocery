import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressDocument } from 'src/Schemas/Address.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schemas/User.schema';
import { createTracing } from 'trace_events';

@Injectable()
export class AddressService {


  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<AddressDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

  ) { }

  async create(userId: string, createAddressDto: CreateAddressDto) {
    const user = await this.userModel.findById(userId).populate('Address');
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingAddress = user.Address.find((addr: any) => {
      return (
        addr.AddressLine1 === createAddressDto.AddressLine1
      );
    });
    if (existingAddress) {
      throw new NotAcceptableException("Address already exists for this user");
    }

    const address = await this.addressModel.create({
      ...createAddressDto,
      user: userId,
    });

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { Address: address._id }, // Match your schema name
    });

    return {
      message: 'Address created successfully',
      data: address,
    };
  }


  async findAll() {
    return this.addressModel.find({ isActive: true }).exec();
  }

  async findOne(id: string) {
    return this.addressModel.findById(id);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const existingAddress = await this.addressModel.findById(id);

    if (!existingAddress) {
      throw new NotAcceptableException("Address not found");
    }

    const updatedAddress = await this.addressModel.findByIdAndUpdate(
      id,
      { $set: updateAddressDto },
      { new: true }
    );

    return {
      message: "Address updated successfully",
      data: updatedAddress,
    };
  }


  async disable(id: string) {
    return this.addressModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }

  async remove(id: string) {
    return this.addressModel.findByIdAndDelete(id);
  }
}
