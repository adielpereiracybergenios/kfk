import { Injectable } from '@nestjs/common';
import { KafkaConsumerService } from 'src/domain/services/kafka-consumer.service';
import { KafkaProducerService } from 'src/domain/services/kafka-producer.service';

@Injectable()
export class AppService {
  constructor(
    private readonly producerService: KafkaProducerService,
    private readonly consumerService: KafkaConsumerService,
  ) {}

  async consume() {
    await this.consumerService.consume(
      { topics: ['my-topic'] },
      {
        eachMessage: async ({ message, partition, topic }) => {
          console.warn(
            `message: ${message}\npartition: ${partition}\ntopic:${topic}`,
          );
        },
      },
    );
  }

  async produce() {
    this.producerService.produce({
      topic: 'my-topic',
      messages: [
        {
          value: 'test message',
          timestamp: new Date().toTimeString(),
        },
      ],
    });
  }
}
