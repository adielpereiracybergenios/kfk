import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Kafka,
  Consumer,
  ConsumerSubscribeTopics,
  ConsumerRunConfig,
} from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private kafka: Kafka;
  private consumers: Consumer[];

  constructor() {
    this.kafka = new Kafka({
      brokers: ['localhost:9092'],
    });
    this.consumers = [];
  }

  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({
      groupId: 'my-app',
    });

    await consumer.connect();
    await consumer.subscribe(topics);
    await consumer.run(config);

    this.consumers.push(consumer);
  }

  async onApplicationShutdown(signal?: string) {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
