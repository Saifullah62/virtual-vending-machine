import { rename, unlink, copyFile } from 'fs/promises';
import { join } from 'path';
import { FileInfo } from './types';

export class FileManager {
  async createBackup(file: FileInfo, backupDir: string): Promise<string> {
    try {
      const backupPath = join(backupDir, `${Date.now()}-${file.path}`);
      await copyFile(file.path, backupPath);
      return backupPath;
    } catch (error) {
      throw new Error(`Failed to create backup for ${file.path}: ${error.message}`);
    }
  }

  async deleteFile(file: FileInfo): Promise<void> {
    try {
      await unlink(file.path);
    } catch (error) {
      throw new Error(`Failed to delete ${file.path}: ${error.message}`);
    }
  }

  async moveFile(file: FileInfo, destination: string): Promise<void> {
    try {
      await rename(file.path, destination);
    } catch (error) {
      throw new Error(`Failed to move ${file.path}: ${error.message}`);
    }
  }
}