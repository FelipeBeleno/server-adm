import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Component, ComponentSchema } from './entities/component.entity';
import { FirestoreService } from 'src/firestore/firestore.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Component.name,
        schema: ComponentSchema
      }
    ])
  ],
  controllers: [ComponentController],
  providers: [ComponentService, FirestoreService],
  exports: [ComponentService]
})
export class ComponentModule { }
