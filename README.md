# yaml-translation-file-to-csv
CLI tool to convert YAML translation files to CSV and back.

This is a simple package, created to convert YAML translation files to CSV and back, so they can be
easily translated without depending on any third-party software (like PoEdit) or service (like
Crowdin, Weblate or Transifex). Thos software and services are great, but they all require either
installation of third-party software or registration with a service. If you want to make your
translation files available to a group that is not accustomed to such software or service, it is
sometimes easier to go with OpenOffice, Microsoft Office or GoogleDocs.

## Installation

```sh
npm i -g yaml-translation-file-to-csv
```

## Usage

Just specify your input file. The script will determine the conversion direction based on the file
extension and save the result to the same location (by default), just with the opposite extension.

```
Usage: yaml-translation-file-to-csv [options] <input>

Arguments:
  input             Path to YAML or CSV file.

Options:
  -V, --version     output the version number
  -o, --out <path>  set custom output path
  -f, --force       overwrite output path
  -h, --help        display help for command
```

*Note: Both `.yaml` and `.yml` are recognized.*

## License

This software is licensed under
[MIT](https://github.com/tillsanders/yaml-translation-file-to-csv/blob/main/LICENSE).

### Thanks

This is such a small script and it took me only two hours to put together. That would never have
been possible without these folks. Thank you very much!

- [commander](https://www.npmjs.com/package/commander)
- [csv](https://www.npmjs.com/package/csv)
- [flat](https://www.npmjs.com/package/flat)
- [js-yaml](https://www.npmjs.com/package/js-yaml)
- [Node.js](https://nodejs.org/en/)

... and more! FOSS rocks!