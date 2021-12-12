import { StorageDisk } from './storage-disk';

export interface StorageConfig {
  disks: Record<string, StorageDisk>;
}
