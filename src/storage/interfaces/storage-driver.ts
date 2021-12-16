export interface StorageDriver {
  put(filePath: string, fileContent: any): void;

  url(path: string): string;

  delete(filePath: string): void;
}
