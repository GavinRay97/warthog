import * as cosmiconfig from 'cosmiconfig';
import * as path from 'path';
import * as prettier from 'prettier';

import { WarthogGluegunToolbox } from '../types';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';

export default {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: WarthogGluegunToolbox) => {
    const {
      config: { load },
      parameters: { options, first, array },
      print: { info, error },
      string: { supplant },
      template: { generate }
    } = toolbox;

    const config: any = load();

    const name = first;
    if (!name) {
      return error('name is required');
    }

    const names = {
      className: toolbox.strings.pascalCase(name),
      camelName: toolbox.strings.camelCase(name),
      kebabName: toolbox.strings.kebabCase(name),
      camelNamePlural: toolbox.strings.camelCase(name) + 's' // Not good, but easy to fix in generated code
    };

    // Allow folder to be passed in or pulled from config files
    const cliGeneratePath =
      options.folder ||
      path.join(config.get('ROOT_FOLDER'), '/', config.get('CLI_GENERATE_PATH'), '/');

    // TODO:DOCS
    // Allow interpolation of the above names into the generate path like './src/${kebabName}'
    const destFolder = supplant(cliGeneratePath, names);

    const warthogPathInGeneratedFolder = config.get('MODULE_IMPORT_PATH');
    const generatedPath = config.get('GENERATED_FOLDER');
    const generatedFolderRelativePath = path.relative(destFolder, generatedPath);

    let warthogPathInSourceFiles;
    // If we're generating inside of an external project, we'll just import from 'warthog'
    if (warthogPathInGeneratedFolder === 'warthog') {
      warthogPathInSourceFiles = 'warthog';
    } else {
      // This ensures we use a relative path in the `examples` folders within the warthog repo
      const warthogAbsolutePath = path.join(generatedPath, warthogPathInGeneratedFolder);
      warthogPathInSourceFiles = path.relative(destFolder, warthogAbsolutePath);
    }

    const props = {
      ...names,
      pascalCase: toolbox.strings.pascalCase,
      camelCase: toolbox.strings.camelCase,
      fields: array ? processFields(array.slice(1)) : [],
      generatedFolderRelativePath,
      warthogPathInSourceFiles
    };

    await generateFile(toolbox, props, 'model.ts.ejs', destFolder, `${names.kebabName}.model.ts`);

    let target = path.join(destFolder, '/', `${names.kebabName}.service.ts`);
    await generate({
      template: 'service.ts.ejs',
      target,
      props
    });
    info(`Generated file at ${target}`);

    target = path.join(destFolder, '/', `${names.kebabName}.resolver.ts`);
    await generate({
      template: 'resolver.ts.ejs',
      target,
      props
    });
    info(`Generated file at ${target}`);

    return;
  }
};

async function generateFile(
  toolbox: Toolbox,
  props: any,
  template: string,
  destFolder: string,
  filename: string
) {
  const target = path.join(destFolder, '/', filename);
  const explorer = cosmiconfig('prettier');
  const config = await explorer.search();

  let generated = await toolbox.template.generate({
    template,
    target,
    props
  });

  generated = prettier.format(generated, {
    ...(config ? config.config : {}),
    parser: 'typescript'
  });

  toolbox.filesystem.write(target, generated);

  toolbox.print.info(`Generated file at ${target}`);
}

function processFields(fields: string[]) {
  // If user doesn't pass fields, generate a single placeholder
  if (!fields.length) {
    fields = ['fieldName'];
  }

  return fields.map((raw: string) => {
    let field: any = {};
    if (raw.endsWith('!')) {
      field.required = true;
      raw = raw.substring(0, raw.length - 1);
    }
    const parts = raw.split(':');
    if (!parts.length) {
      throw new Error('found an empty field');
    }

    // Make sure this is camel case
    field.name = parts[0];

    if (parts.length > 1) {
      // validate this is a valid type
      field.type = parts[1];
    } else {
      field.type = 'string';
    }

    const typeFields: { [key: string]: { [key: string]: string } } = {
      bool: {
        decorator: 'BooleanField',
        tsType: 'boolean'
      },
      date: {
        decorator: 'DateField',
        tsType: 'Date'
      },
      int: {
        decorator: 'IntField',
        tsType: 'number'
      },
      float: {
        decorator: 'FloatField',
        tsType: 'number'
      },
      json: {
        decorator: 'JSONField',
        tsType: 'JsonObject'
      },
      otm: {
        decorator: 'OneToMany',
        tsType: '---'
      },
      string: {
        decorator: 'StringField',
        tsType: 'string'
      }
    };

    // TODO: validate otm fields are plural?

    field = {
      ...field,
      ...typeFields[field.type]
    };

    return field;
  });
}
