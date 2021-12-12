import { DynamicModule, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageConfig } from './interfaces/storage-config';

@Module({})
export class StorageModule {
  static register(config: StorageConfig): DynamicModule {
    return {
      global: true,
      module: StorageModule,
      providers: [
        {
          provide: StorageService,
          useValue: new StorageService(config),
        },
      ],
      exports: [StorageService],
    };
  }
}
