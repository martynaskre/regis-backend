import { DiskOptions as BaseDiskOptions } from '@squareboat/nest-storage/lib/interfaces/storageOptions';

declare module '@squareboat/nest-storage' {
  export interface DiskOptions extends BaseDiskOptions {
    baseUrl?: string;
  }
}
