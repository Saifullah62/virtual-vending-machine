export interface FileInfo {
  path: string;
  size: number;
  hash: string;
  lastModified: Date;
}

export interface DuplicateGroup {
  hash: string;
  size: number;
  files: FileInfo[];
}

export interface ScanOptions {
  directory: string;
  recursive?: boolean;
  compareNames?: boolean;
  minSize?: number;
  excludePatterns?: string[];
  dryRun?: boolean;
  createBackup?: boolean;
}

export interface ScanResult {
  duplicateGroups: DuplicateGroup[];
  totalFiles: number;
  totalSize: number;
  savedSpace: number;
}