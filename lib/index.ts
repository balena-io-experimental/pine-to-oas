import * as _ from 'lodash';
import * as fs from 'fs';
import * as YAML from 'yamljs';

import { Oas, OasDataType } from './oas-schema';
import { PineSchema, DataType as PineDataType } from './pine-schema';
import { generateOas } from './generate-oas';

const pine: PineSchema = JSON.parse(fs.readFileSync('model.json', 'utf8'));
const oas = generateOas(pine);

fs.writeFileSync(
    'openapi.yaml',
    YAML.stringify(oas, 10),
    { encoding: 'utf8' }
);

