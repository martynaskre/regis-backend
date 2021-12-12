import { Injectable } from '@nestjs/common';
import { StorageConfig } from './interfaces/storage-config';
import { DriverManager } from './driver-manager';

@Injectable()
export class StorageService {
  private readonly config: StorageConfig;
  private readonly driverManager: DriverManager;

  constructor(config: StorageConfig) {
    this.config = config;
    this.driverManager = new DriverManager();
  }

  disk(disk: string) {
    if (this.config.disks[disk]) {
      return this.driverManager.getDriver(this.config.disks[disk]);
    }

    throw new Error('Disk is not registered!');
  }
}
