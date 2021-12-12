import { Local } from './drivers/local';
import { StorageDriver } from './interfaces/storage-driver';
import { StorageDisk } from './interfaces/storage-disk';

export class DriverManager {
  private readonly driverMap: { [key: string]: any } = {
    local: Local,
  };

  getDriver(config: StorageDisk): StorageDriver {
    const driver = this.driverMap[config.driver];

    return new driver(config);
  }
}
