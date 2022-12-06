import { Module } from '@nestjs/common';
import { KafkaConsumerService } from 'src/domain/services/kafka-consumer.service';
import { KafkaProducerService } from 'src/domain/services/kafka-producer.service';

@Module({
  imports: [],
  exports: [KafkaProducerService, KafkaConsumerService],
  providers: [KafkaConsumerService, KafkaProducerService],
  controllers: [],
})
export class KafkaModule {}
