import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';
import { FirestoreService } from 'src/firestore/firestore.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Client.name,
      schema: ClientSchema
    }
  ])],
  controllers: [ClientController],
  providers: [ClientService, FirestoreService],
})
export class ClientModule { }
