import { Module } from '@nestjs/common';
import { AppController } from 'src/infra/controllers/app.controller';
import { AppService } from 'src/domain/services/app.service';
import { KafkaModule } from 'src/infra/modules/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
