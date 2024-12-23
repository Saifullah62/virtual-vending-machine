import { FileInfo, DuplicateGroup, ScanResult } from './types';

export class DuplicateFinder {
  findDuplicates(files: FileInfo[]): ScanResult {
    const hashGroups = new Map<string, FileInfo[]>();

    // Group files by hash
    for (const file of files) {
      const existing = hashGroups.get(file.hash) || [];
      hashGroups.set(file.hash, [...existing, file]);
    }

    // Filter groups with duplicates
    const duplicateGroups: DuplicateGroup[] = [];
    let totalSize = 0;
    let savedSpace = 0;

    for (const [hash, groupFiles] of hashGroups) {
      if (groupFiles.length > 1) {
        const size = groupFiles[0].size;
        duplicateGroups.push({
          hash,
          size,
          files: groupFiles,
        });
        totalSize += size * groupFiles.length;
        savedSpace += size * (groupFiles.length - 1);
      }
    }

    return {
      duplicateGroups,
      totalFiles: files.length,
      totalSize,
      savedSpace,
    };
  }
}