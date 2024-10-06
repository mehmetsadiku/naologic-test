import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvUploadTask } from './product/entities/csv-upload';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VendorModule } from './vendor/vendor.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { VendorService } from './vendor/vendor.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes config accessible across all modules
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    VendorModule,
    ManufacturerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
