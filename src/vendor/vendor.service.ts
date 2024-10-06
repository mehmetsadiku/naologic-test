import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { Vendor } from './entities/vendor.entity';
import { Model } from 'mongoose';

@Injectable()
export class VendorService {
  private readonly logger = new Logger(VendorService.name);
  constructor(@InjectModel(Vendor.name) private vendorModel: Model<Vendor>) {}

  /**
   * Creates a new vendor in the database.
   *
   * @param {CreateVendorDto} createVendorDto - The data to create the vendor with.
   * @returns {Promise<Vendor>} The newly created vendor.
   * @throws {InternalServerErrorException} If a vendor with the given ID already exists.
   */
  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    try {
      const createVendor = new this.vendorModel(createVendorDto);

      return await createVendor.save();
    } catch (error) {
      this.logger.error(
        `Failed to create vendor: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create vendor');
    }
  }

  /**
   * Find a vendor by their ID.
   *
   * @param {number} id - The vendor's ID.
   * @returns {Promise<Vendor>} The vendor with the given ID if found, otherwise null.
   */
  async findOne(id: number): Promise<Vendor | null> {
    try {
      return await this.vendorModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(
        `Failed to find vendor by ID: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to find vendor');
    }
  }
  /**
   * Find a vendor by their name.
   *
   * @param {string} name - The vendor's name.
   * @returns {Promise<Vendor>} The vendor with the given name if found, otherwise null.
   */
  async findByName(name: number): Promise<Vendor | null> {
    try {
      const vendor = await this.vendorModel.findOne({ name: name });
      return vendor;
    } catch (error) {
      this.logger.error(
        `Failed to find vendor by name: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to find vendor by name');
    }
  }
}
