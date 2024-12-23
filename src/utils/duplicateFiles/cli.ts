#!/usr/bin/env node
import { Command } from 'commander';
import { FileScanner } from './fileScanner';
import { DuplicateFinder } from './duplicateFinder';
import { FileManager } from './fileManager';
import { Reporter } from './reporter';
import { ScanOptions } from './types';
import chalk from 'chalk';
import cliProgress from 'cli-progress';

const program = new Command();

program
  .name('find-duplicates')
  .description('Find and manage duplicate files in a directory')
  .version('1.0.0')
  .requiredOption('-d, --directory <path>', 'Directory to scan')
  .option('-r, --recursive', 'Scan subdirectories recursively', false)
  .option('-n, --compare-names', 'Consider file names in comparison', false)
  .option('-m, --min-size <bytes>', 'Minimum file size to consider', '1')
  .option('-e, --exclude <patterns>', 'Exclude patterns (comma-separated)')
  .option('--dry-run', 'Show what would be done without making changes', false)
  .option('-b, --backup', 'Create backups before deletion', false);

async function main() {
  program.parse();
  const options = program.opts();

  const scanOptions: ScanOptions = {
    directory: options.directory,
    recursive: options.recursive,
    compareNames: options.compareNames,
    minSize: parseInt(options.minSize),
    excludePatterns: options.exclude?.split(','),
    dryRun: options.dryRun,
    createBackup: options.backup,
  };

  const progressBar = new cliProgress.SingleBar({
    format: 'Scanning |' + chalk.cyan('{bar}') + '| {percentage}% || {value}/{total} files',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
  });

  try {
    console.log(chalk.blue('\nStarting file scan...'));
    
    const scanner = new FileScanner();
    const files = await scanner.scanDirectory(scanOptions);
    
    progressBar.start(files.length, 0);
    files.forEach((_, index) => {
      progressBar.update(index + 1);
    });
    progressBar.stop();

    const finder = new DuplicateFinder();
    const result = finder.findDuplicates(files);

    const reporter = new Reporter();
    console.log(reporter.generateReport(result));

    if (!options.dryRun && result.duplicateGroups.length > 0) {
      const fileManager = new FileManager();
      // Implement interactive deletion logic here
    }
  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}

main();