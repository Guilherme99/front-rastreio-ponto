import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { KafkaContext } from 'src/kafka/kafka-context';
import { RoutesDriverService } from './routes-driver.service';

@Controller()
export class RoutesDriverConsumer {
  private logger = new Logger(RoutesDriverConsumer.name);

  constructor(private routeDriverService: RoutesDriverService) {}

  @MessagePattern('simulator')
  async driverMoved(payload: KafkaContext) {
    this.logger.log(
      `Updating simulator ${payload.topic}`,
      payload.messageValue,
    );
    await this.routeDriverService.processRoute(payload.messageValue);
  }
}
