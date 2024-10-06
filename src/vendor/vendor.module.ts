import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor } from './entities/vendor.entity';
import { VendorSchema } from './schema/vendor.schema';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
  exports: [VendorService],
  imports: [
    MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]), // Register the Vendor schema here
  ],
})
export class VendorModule {}
