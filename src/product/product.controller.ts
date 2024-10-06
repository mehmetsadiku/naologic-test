import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CsvUploadTask } from './utils/csv-upload';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly csvUploadTask: CsvUploadTask,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Param('id') id: string) {
    return this.csvUploadTask.handleCsvUpload();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.csvUploadTask.handleCsvUpload();
  }
}
