import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from 'src/Schemas/Address.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),UserModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule { }
