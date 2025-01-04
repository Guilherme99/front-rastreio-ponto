import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { MapsModule } from 'src/maps/maps.module';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
import { RoutesDriverGateway } from './routes-driver/routes-driver.gateway';

@Module({
  imports: [MapsModule],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesDriverService, RoutesDriverGateway],
})
export class RoutesModule {}
