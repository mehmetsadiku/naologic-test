import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  manufacturerModel: any;
  /**
   * Create a new manufacturer with the given data
   * @param createManufacturerDto data to create a manufacturer
   * @returns the created manufacturer
   */

  async create(createManufacturerDto: CreateManufacturerDto) {
    try {
      const createManufacturer = await new this.manufacturerModel(
        createManufacturerDto,
      );
      return await createManufacturer.save();
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all manufacturer`;
  }

  async findOne(id: number) {
    return await this.manufacturerModel.findOne({ _id: id });
  }

  update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    return `This action updates a #${id} manufacturer`;
  }

  remove(id: number) {
    return `This action removes a #${id} manufacturer`;
  }
}
