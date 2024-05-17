import { Controller, Get, Param } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('')
  findAllTables(): Promise<string[]> {
    return this.databaseService.findAllTables();
  }

  @Get(':tableName')
  findTableData(@Param('tableName') tableName: string): Promise<any[]> {
    return this.databaseService.findTableData(tableName);
  }
}
