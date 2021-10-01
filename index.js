const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const flatten = require('flat');
const unflatten = require('flat').unflatten;
const csvStringify = require('csv-stringify/lib/sync');
const csvParse = require('csv-parse/lib/sync');

function convertToCSV(inputPath, outputPath) {
  try {
    const content = yaml.load(fs.readFileSync(inputPath, 'utf8'));
    const flattened = flatten(content);
    const csv = csvStringify(Object.entries(flattened));
    fs.writeFileSync(outputPath, csv);
    console.log(outputPath);
  } catch (e) {
    console.error(e);
  }
}

function convertToYAML(inputPath, outputPath) {
  try {
    const csv = fs.readFileSync(inputPath, 'utf8');
    const lines = csvParse(csv, {
      columns: false,
      skip_empty_lines: true
    });
    const flattened =
      lines.reduce((result, current) => (result[current[0]] = current[1], result), {})
    const unflattened = unflatten(flattened);
    const content = yaml.dump(unflattened, {
      quotingType: '"',
      forceQuotes: true,
    });
    fs.writeFileSync(outputPath, content);
    console.log(outputPath);
  } catch (e) {
    console.error(e);
  }
}

function convert(inputPath, options) {
  const resolvedPath = path.resolve(inputPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`No file found at ${resolvedPath}`);
    return;
  }

  const inputExtension = path.extname(resolvedPath);
  let outputExtension
  if (['.yaml', '.yml'].includes(inputExtension))
    outputExtension = '.csv';

  if (inputExtension === '.csv')
    outputExtension = '.yaml';

  let outputPath = typeof options.out !== 'undefined' ? path.resolve(options.out) :
    path.join(
      path.dirname(resolvedPath),
      path.basename(resolvedPath, path.extname(resolvedPath)) + outputExtension,
    )

  if (typeof options.force === 'undefined' && fs.existsSync(outputPath)) {
    console.error(`Output path already exists at ${outputPath}`);
    return;
  }

  if (outputExtension === '.yaml') {
    convertToYAML(resolvedPath, outputPath);
    return;
  }

  if (outputExtension === '.csv') {
    convertToCSV(resolvedPath, outputPath);
    return;
  }

  console.error('Does the input path have an appropriate file extension (yaml, yml, csv)?')
}

program.version('1.0.0');
program
  .argument('<input>', 'Path to YAML or CSV file.')
  .option('-o, --out <path>', 'set custom output path')
  .option('-f, --force', 'overwrite output path')
  .action(convert);
program.parse(process.argv);