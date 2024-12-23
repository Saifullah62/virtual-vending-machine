import { createHash } from 'crypto';
import { readFile, stat } from 'fs/promises';
import { readdir } from 'fs/promises';
import { join, relative } from 'path';
import { FileInfo, ScanOptions } from './types';

export class FileScanner {
  private async calculateHash(filePath: string): Promise<string> {
    try {
      const content = await readFile(filePath);
      return createHash('sha256').update(content).digest('hex');
    } catch (error) {
      throw new Error(`Failed to calculate hash for ${filePath}: ${error.message}`);
    }
  }

  private async getFileInfo(basePath: string, filePath: string): Promise<FileInfo> {
    try {
      const stats = await stat(filePath);
      return {
        path: relative(basePath, filePath),
        size: stats.size,
        hash: await this.calculateHash(filePath),
        lastModified: stats.mtime,
      };
    } catch (error) {
      throw new Error(`Failed to get file info for ${filePath}: ${error.message}`);
    }
  }

  private shouldExcludeFile(path: string, options: ScanOptions): boolean {
    if (!options.excludePatterns) return false;
    return options.excludePatterns.some(pattern => 
      new RegExp(pattern).test(path)
    );
  }

  async scanDirectory(options: ScanOptions): Promise<FileInfo[]> {
    const files: FileInfo[] = [];
    const minSize = options.minSize || 0;

    async function scan(directory: string) {
      const entries = await readdir(directory, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(directory, entry.name);

        if (entry.isDirectory() && options.recursive) {
          await scan(fullPath);
        } else if (entry.isFile()) {
          if (!this.shouldExcludeFile(fullPath, options)) {
            const stats = await stat(fullPath);
            if (stats.size >= minSize) {
              const fileInfo = await this.getFileInfo(options.directory, fullPath);
              files.push(fileInfo);
            }
          }
        }
      }
    }

    await scan(options.directory);
    return files;
  }
}