export interface PineSchema {
    tables: { [name: string]: Table };
    relationships:{  [name: string]: Relationship };
    rules: { [name: string]: Rule };
    synonyms: { [name: string]: string };
}

export interface Table {
    fields: Field[];
    primitive: boolean;
    name: string;
    idField: string;
    referenceScheme: string;
    modelName: string;
    resourceName: string;
    indexes: Index[];
}

export interface Field {
    fieldName: string;
    dataType: DataType;
    required: boolean;
    index: null | IndexType;
    references: null | {
        tableName: string;
        fieldName: null | string;
    };
    defaultValue: null | string;
}

type DataType =
    | "Date Time"
    | "Serial"
    | "ConceptType"
    | "Short Text"
    | "Text"
    | "Hashed"
    | "File"
    | "Boolean"
    | "ForeignKey"
    | "Integer"
    | "JSON"

export interface Index {
    type: IndexType;
    fields: string[]
}

type IndexType = "UNIQUE" | "PRIMARY KEY"

export interface Relationship {
    // Ignoring for now
}

export interface Rule {
    // Ignoring for now
}