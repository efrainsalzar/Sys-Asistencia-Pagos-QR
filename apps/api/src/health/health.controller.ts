import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('database')
  async database() {
    try {
      await this.databaseService.query('SELECT 1');

      return {
        status: 'ok',
        database: 'connected',
      };
    } catch {
      return {
        status: 'error',
        database: 'disconnected',
      };
    }
  }
}