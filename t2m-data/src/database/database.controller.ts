import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) { }

  @Get()
  @ResponseMessage("Create a new user")
  async findCollectionsList() {
    return await this.databaseService.findCollectionsList()
  }

  @Get(':collectionName')
  async getDocumentsFromCollection(
    @Param('collectionName') collectionName: string
  ) {
    try {
      return await this.databaseService.findAllInCollection(collectionName);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
