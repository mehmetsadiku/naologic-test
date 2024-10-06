import { Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { nanoid } from 'nanoid';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Cron } from '@nestjs/schedule';
import { VendorService } from 'src/vendor/vendor.service';
import {
  formatVendor,
  formatProductData,
  formatVariant,
  promptResponse,
} from '../utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CsvUploadTask {
  constructor(
    private readonly productService: ProductService,
    private readonly vendorService: VendorService,
    private readonly configService: ConfigService,
  ) {}

  @Cron('* 1 * * * *')
  /**
   * This function is run every minute by the scheduler.
   * It reads the data.txt file line by line, and for each line, it does the following:
   *   - Find the vendor by name. If not found, create a new one.
   *   - Find the product by ID. If found, add a variant to the product.
   *   - If not found, create a new product.
   * The function uses the csv-parser library to read the data.txt file.
   * The function uses the prompt library to get user input for the variant description.
   * The function uses the nanoid library to generate a unique id for the vendor.
   */
  async handleCsvUpload() {
    const filePath = this.configService.get<string>('CSV_FILE_PATH'); // Fetch file path from config or environment variable
    if (!filePath) {
      throw new Error('CSV file path is not defined');
    }
    try {
      const stream = fs
        .createReadStream(filePath)
        .pipe(csv({ separator: '\t' }));

      for await (const row of stream) {
        const productId = row.ProductID;

        const vendor = await this.vendorService.findByName(row.SiteSource);

        let vendorId = vendor?.id;
        if (!vendorId) {
          vendorId = nanoid();
          const vendor = formatVendor({ name: row.SiteSource, vendorId });
          await this.vendorService.create(vendor);
        }
        let product = await this.productService.findOne(productId);
        if (product) {
          const variant = formatVariant(row);
          const response = await promptResponse(row);
          variant.description =
            response?.text?.trim() || variant.description || '';
          await this.productService.addVariant(productId, variant);
        } else {
          const productData = formatProductData(row, vendorId);

          await this.productService.create(productData);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
