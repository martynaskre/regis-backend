import { StorageDriver } from '../interfaces/storage-driver';
import * as path from 'path';
import * as fs from 'fs-extra';
import { StorageDisk } from '../interfaces/storage-disk';

export class Local implements StorageDriver {
  constructor(private readonly config: StorageDisk) {}

  async put(filePath: string, fileContent: any): Promise<void> {
    await fs.outputFile(path.join(this.config.path, filePath), fileContent);
  }

  url(path: string): string {
    return new URL(path, this.config.baseUrl).toString();
  }
}
