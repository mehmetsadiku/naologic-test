import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CsvUploadTask } from './entities/csv-upload';
import { Product, ProductSchema } from './schema/product.schema';
import { VendorModule } from 'src/vendor/vendor.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    VendorModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, CsvUploadTask],
})
export class ProductModule {}
