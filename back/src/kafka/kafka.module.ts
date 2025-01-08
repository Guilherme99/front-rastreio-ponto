import { Inject, Module, OnModuleInit } from '@nestjs/common';
import * as kafkalib from '@confluentinc/kafka-javascript';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [
        {
            provide: 'KAFKA_PRODUCER',
            useFactory: (configService: ConfigService) => {
                return new kafkalib.KafkaJS.Kafka({
                    'bootstrap.servers': configService.get('KAFKA_BROKER'),
                }).producer();
            },
            inject: [ConfigService]
        }
    ],
    exports: ['KAFKA_PRODUCER']
})
export class KafkaModule implements OnModuleInit{
    constructor(@Inject('KAFKA_PRODUCER') private readonly kafkaProducer: kafkalib.KafkaJS.Producer) {}

    async onModuleInit() {
        const producer = this.kafkaProducer;
        await producer.connect();
    }
}
