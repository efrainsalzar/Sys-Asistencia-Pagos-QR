import { Injectable } from '@nestjs/common';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';

@Injectable()
export class OrganizacionService {
  create(_createOrganizacionDto: CreateOrganizacionDto) {
    return 'This action adds a new organizacion';
  }

  findAll() {
    return `This action returns all organizacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizacion`;
  }

  update(id: number, _updateOrganizacionDto: UpdateOrganizacionDto) {
    return `This action updates a #${id} organizacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacion`;
  }
}
