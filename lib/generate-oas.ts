import * as _ from 'lodash';

import { Oas, OasDataType } from './oas-schema';
import { PineSchema, DataType as PineDataType } from './pine-schema';

export function generateOas(pine: PineSchema): Oas {
    const oas: Oas = {
        openapi: '3.0.1',
        info: {
            title: 'Resin.io',
            version: '3.0.0',
            description: 'Resin.io Data API'
        },
        servers: [
            { url: 'https://api.resin.io/v3' }
        ],
        paths: {},
    };
    
    addModels(oas, pine);
    addPaths(oas, pine);
    addSecurity(oas);

    return oas;
}

function addModels(oas: Oas, pine: PineSchema) {
    oas.components = oas.components || {};
    oas.components.schemas = _(pine.tables)
        .mapKeys((table, name) => getResourceName(name, pine))
        .mapValues((table) => ({
        required: table.fields.filter(f => f.required).map(f => f.fieldName),
        properties: _(table.fields)
            .keyBy((f) => getFieldName(f.fieldName))
            .mapValues((f) => ({
                type: mapType(f.dataType),
                nullable: !f.required
            }))
            .valueOf()
        }))
        .valueOf();

    oas.components.schemas.Error = {
        properties: { }
    }
}

function getResourceName(tableName: string, pine: PineSchema): string {
    let synonym = _.findKey(pine.synonyms, (p) => p === tableName);
    tableName = synonym || tableName;

    return tableName
        // 'api key' -> 'api-key'
        .replace(/\s/g, '_')
}

function getFieldName(fieldName: string): string {
    // 'depends on-application' -> 'depends_on__application'
    return fieldName
        .replace(/-/g, '__')
        .replace(/\s/g, '_')
}

function mapType(type: PineDataType): OasDataType {
    return (<{ [k: string]: OasDataType }> {
        "Date Time": "string",
        "Serial": "integer",
        "ConceptType": "integer",
        "Short Text": "string",
        "Text": "string",
        "Hashed": "string",
        "File": "string",
        "Boolean": "boolean",
        "ForeignKey": "integer",
        "Integer": "integer",
        "JSON": "string"
    })[type]
}

function addPaths(oas: Oas, pine: PineSchema) {
    oas.paths = {};

    // Collection endpoints
    oas.paths = _(pine.tables)
        .mapKeys((table, name) => getResourceName(name, pine))
        .mapValues((table, name) => ({
            get: {
                summary: `Get all ${name}s`,
                operationId: `getAll${name}`,
                parameters: [],
                responses: {
                    '200': {
                        description: `Successfully got ${name}s`,
                        content: {
                            'application/json': {
                                schema: { '$ref': `#/components/schemas/${name}` }
                            }
                        }
                    },
                    default: {
                        description: 'Unexpected error',
                        content: {
                            'application/json': {
                                schema: { '$ref': `#/components/schemas/Error` }
                            }
                        }
                    }
                }
            }}))
        .mapKeys((table, name) => `/${name}`)
        .valueOf();
}

function addSecurity(oas: Oas) {
    oas.components = oas.components || {};
    oas.components.securitySchemes = {
        token: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT|apiKey'
        }
    };
    oas.security = [
        { token: [] }
    ]
}