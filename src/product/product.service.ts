import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schema/product.schema';
// import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  /**
   * Create a new product.
   * @param createProductDto - DTO for creating the product.
   * @returns Promise<Product> - The created product.
   * @throws InternalServerErrorException - If product creation fails.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      return await createdProduct.save();
    } catch (error) {
      this.logger.error('Error creating product', error.stack);
      throw new InternalServerErrorException('Failed to create product');
    }
  }
  /**
   * Add a variant to an existing product.
   * @param productId - ID of the product.
   * @param variant - The variant to be added.
   * @throws InternalServerErrorException - If adding variant fails.
   */
  async addVariant(productId: string, variant: any): Promise<void> {
    try {
      await this.productModel.updateOne(
        { productId },
        { $addToSet: { variants: variant } },
      );
    } catch (error) {
      this.logger.error(
        `Error adding variant to product ${productId}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to add variant to product ${productId}`,
      );
    }
  }
  /**
   * Find a product by its ID.
   * @param id - The product's ID.
   * @returns Promise<Product | null> - The found product, or null if not found.
   * @throws InternalServerErrorException - If finding product fails.
   */
  async findOne(id: number): Promise<Product | null> {
    try {
      const product = await this.productModel
        .findOne({
          productId: id,
        })
        .exec();
      return product;
    } catch (error) {
      this.logger.error(`Error finding product with ID ${id}`, error.stack);
      throw new InternalServerErrorException(
        `Failed to find product with ID ${id}`,
      );
    }
  }
}
