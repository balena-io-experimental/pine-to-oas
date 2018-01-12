import * as _ from 'lodash';

import { Oas, OasDataType } from './oas-schema';
import { PineSchema, DataType as PineDataType, Table } from './pine-schema';

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
        .mapKeys((table) => getResourceName(table, pine))
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

function getResourceName(table: Table, pine: PineSchema): string {
    let tableName = table.resourceName;
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
    const models = _(pine.tables)
    .values()
    .sortBy((m) => getResourceName(m, pine))
    .filter((m) => getResourceName(m, pine).indexOf('-has-') === -1)
    .map((model) => {
        const name = getResourceName(model, pine);

        return {
            [`/${name}`]: {
                get: {
                    summary: `Get all ${name}s`,
                    operationId: `getAll${name}`,
                    parameters: [],
                    responses: {
                        '200': {
                            description: `Successfully got ${name}s`,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            d: {
                                                type: "array",
                                                items: {
                                                    '$ref': `#/components/schemas/${name}`
                                                }
                                            }
                                        }
                                    }
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
                }
            },
            [`/${name}({id})`]: {
                get: {
                    summary: `Get ${name} by id`,
                    operationId: `get${name}ById`,
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        require: true,
                        description: `The id of the ${name}`,
                        schema: { type: 'number' }
                    }],
                    responses: {
                        '200': {
                            description: `Successfully got ${name}`,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            d: {
                                                type: "array",
                                                items: {
                                                    '$ref': `#/components/schemas/${name}`
                                                }
                                            }
                                        }
                                    }
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
                }
            }
        };
    }).valueOf();

    oas.paths = _.reduce(models, _.assign);
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