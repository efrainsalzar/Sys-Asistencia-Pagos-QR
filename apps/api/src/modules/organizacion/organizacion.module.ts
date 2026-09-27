import { Module } from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { OrganizacionController } from './organizacion.controller';

@Module({
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
})
export class OrganizacionModule {}
