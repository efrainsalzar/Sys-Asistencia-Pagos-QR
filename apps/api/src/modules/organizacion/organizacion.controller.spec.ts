import { Test, TestingModule } from '@nestjs/testing';
import { OrganizacionController } from './organizacion.controller';
import { OrganizacionService } from './organizacion.service';

describe('OrganizacionController', () => {
  let controller: OrganizacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizacionController],
      providers: [OrganizacionService],
    }).compile();

    controller = module.get<OrganizacionController>(OrganizacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
