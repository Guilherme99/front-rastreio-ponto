import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { KafkaContext } from 'src/kafka/kafka-context';
import { RoutesDriverService } from './routes-driver.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class RoutesDriverConsumer {
  private logger = new Logger(RoutesDriverConsumer.name);

  constructor(
    private routeDriverService: RoutesDriverService,
    private httpService: HttpService,
  ) {}

  @MessagePattern('simulator')
  async driverMoved(payload: KafkaContext) {
    this.logger.log(
      `Updating simulator ${payload.topic}`,
      payload.messageValue,
    );
    const { route_id, lat, lng } = JSON.parse(payload.messageValue);
    await this.httpService.axiosRef.post(
      `http://localhost:3000/routes/${route_id}/process-route`,
      {
        lat,
        lng,
      },
    );
  }
}
