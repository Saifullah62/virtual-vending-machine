import chalk from 'chalk';
import { DuplicateGroup, ScanResult } from './types';

export class Reporter {
  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  private formatDate(date: Date): string {
    return date.toLocaleString();
  }

  generateReport(result: ScanResult): string {
    let report = '\n' + chalk.bold('Duplicate Files Report\n');
    report += chalk.gray('=' .repeat(50) + '\n\n');

    report += chalk.blue('Summary:\n');
    report += `Total files scanned: ${result.totalFiles}\n`;
    report += `Total size: ${this.formatSize(result.totalSize)}\n`;
    report += `Potential space savings: ${this.formatSize(result.savedSpace)}\n\n`;

    if (result.duplicateGroups.length === 0) {
      report += chalk.green('No duplicate files found.\n');
      return report;
    }

    report += chalk.yellow(`Found ${result.duplicateGroups.length} groups of duplicates:\n\n`);

    result.duplicateGroups.forEach((group: DuplicateGroup, index: number) => {
      report += chalk.cyan(`Group ${index + 1} (${this.formatSize(group.size)} each):\n`);
      report += chalk.gray('Hash: ' + group.hash + '\n');
      
      group.files.forEach(file => {
        report += `  ${chalk.white(file.path)}\n`;
        report += `    ${chalk.gray(`Last modified: ${this.formatDate(file.lastModified)}`)}\n`;
      });
      report += '\n';
    });

    return report;
  }
}