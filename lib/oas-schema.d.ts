/**
 * Generated with magic by taking https://github.com/OAI/OpenAPI-Specification/pull/1270
 * converting to JSON, and passing it to https://www.npmjs.com/package/json-schema-to-typescript
 */

// Custom: oddly, this isn't defined in the spec
// Length is here to strip 'undefined' from the options.
type OasDataType = Schema['type'] & { length: number };

export type Parameter = ParameterWithSchema | ParameterWithContent;
export type ParameterWithSchema = ParameterWithSchemaWithExample | ParameterWithSchemaWithExamples;
export type ParameterWithSchemaWithExample =
  | ParameterWithSchemaWithExampleInPath
  | ParameterWithSchemaWithExampleInQuery
  | ParameterWithSchemaWithExampleInHeader
  | ParameterWithSchemaWithExampleInCookie;
export type ParameterWithSchemaWithExamples =
  | ParameterWithSchemaWithExamplesInPath
  | ParameterWithSchemaWithExamplesInQuery
  | ParameterWithSchemaWithExamplesInHeader
  | ParameterWithSchemaWithExamplesInCookie;
export type ParameterWithContent = ParameterWithContentInPath | ParameterWithContentNotInPath;
export type MediaType = MediaTypeWithExample | MediaTypeWithExamples;
export type Header = HeaderWithSchema | HeaderWithContent;
export type HeaderWithSchema = HeaderWithSchemaWithExample | HeaderWithSchemaWithExamples;
export type Link = LinkWithOperationRef | LinkWithOperationId;
export type SecurityScheme =
  | ApiKeySecurityScheme
  | HttpSecurityScheme
  | OAuth2SecurityScheme
  | OpenIdConnectSecurityScheme;
export type HttpSecurityScheme = NonBearerHttpSecurityScheme | BearerHttpSecurityScheme;

export interface Oas {
  openapi: string;
  info: Info;
  externalDocs?: ExternalDocumentation;
  servers?: Server[];
  security?: SecurityRequirement[];
  tags?: Tag[];
  // Custom: defined this properly
  paths: { [key: string]: PathItem };
  components?: Components;
}
export interface Info {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
  version: string;
}
export interface Contact {
  name?: string;
  url?: string;
  email?: string;
}
export interface License {
  name: string;
  url?: string;
}
export interface ExternalDocumentation {
  description?: string;
  url: string;
}
export interface Server {
  url: string;
  description?: string;
  variables?: {
    [k: string]: ServerVariable;
  };
}
export interface ServerVariable {
  enum?: string[];
  default: string;
  description?: string;
}
export interface SecurityRequirement {
  [k: string]: string[];
}
export interface Tag {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentation;
}
/**
 * This interface was referenced by `Paths`'s JSON-Schema definition
 * via the `patternProperty` "^\/".
 */
export interface PathItem {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  trace?: Operation;
  servers?: Server[];
  parameters?: (Parameter | Reference)[];
}
export interface Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentation;
  operationId?: string;
  parameters?: (Parameter | Reference)[];
  requestBody?: RequestBody | Reference;
  responses: Responses;
  callbacks?: {
    [k: string]: Callback | Reference;
  };
  deprecated?: boolean;
  security?: SecurityRequirement[];
  servers?: Server[];
}
export interface ParameterWithSchemaWithExampleInPath {
  name: string;
  in: "path";
  description?: string;
  required: true;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "matrix" | "label" | "simple";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  example?: any;
}
export interface Schema {
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: any[];
  type?: "array" | "boolean" | "integer" | "number" | "object" | "string";
  not?: Schema | Reference;
  allOf?: (Schema | Reference)[];
  oneOf?: (Schema | Reference)[];
  anyOf?: (Schema | Reference)[];
  items?: Schema | Reference;
  properties?: {
    [k: string]: Schema | Reference;
  };
  additionalProperties?: Schema | Reference | boolean;
  description?: string;
  format?: string;
  default?: any;
  nullable?: boolean;
  discriminator?: Discriminator;
  readOnly?: boolean;
  writeOnly?: boolean;
  example?: any;
  externalDocs?: ExternalDocumentation;
  deprecated?: boolean;
  xml?: Xml;
}
export interface Reference {
  $ref: string;
  [k: string]: any;
}
export interface Discriminator {
  propertyName: string;
  mapping?: {
    [k: string]: string;
  };
  [k: string]: any;
}
export interface Xml {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
}
export interface ParameterWithSchemaWithExampleInQuery {
  name: string;
  in: "query";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  example?: any;
}
export interface ParameterWithSchemaWithExampleInHeader {
  name: string;
  in: "header";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "simple";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  example?: any;
}
export interface ParameterWithSchemaWithExampleInCookie {
  name: string;
  in: "cookie";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "form";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  example?: any;
}
export interface ParameterWithSchemaWithExamplesInPath {
  name: string;
  in: "path";
  description?: string;
  required: true;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "matrix" | "label" | "simple";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  examples: {
    [k: string]: Example | Reference;
  };
}
export interface Example {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}
export interface ParameterWithSchemaWithExamplesInQuery {
  name: string;
  in: "query";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  examples: {
    [k: string]: Example | Reference;
  };
}
export interface ParameterWithSchemaWithExamplesInHeader {
  name: string;
  in: "header";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "simple";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  examples: {
    [k: string]: Example | Reference;
  };
}
export interface ParameterWithSchemaWithExamplesInCookie {
  name: string;
  in: "cookie";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "form";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  examples: {
    [k: string]: Example | Reference;
  };
}
export interface ParameterWithContentInPath {
  name: string;
  in: "path";
  description?: string;
  required?: true;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  content: {
    [k: string]: MediaType;
  };
}
export interface MediaTypeWithExample {
  schema?: Schema | Reference;
  example?: any;
  encoding?: {
    [k: string]: Encoding;
  };
}
export interface Encoding {
  contentType?: string;
  headers?: {
    [k: string]: Header;
  };
  style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject";
  explode?: boolean;
  allowReserved?: boolean;
}
export interface HeaderWithSchemaWithExample {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "simple";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  example?: any;
}
export interface HeaderWithSchemaWithExamples {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: "simple";
  explode?: boolean;
  allowReserved?: boolean;
  schema: Schema | Reference;
  examples: {
    [k: string]: Example | Reference;
  };
}
export interface HeaderWithContent {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  content: {
    [k: string]: MediaType;
  };
}
export interface MediaTypeWithExamples {
  schema?: Schema | Reference;
  examples: {
    [k: string]: Example | Reference;
  };
  encoding?: {
    [k: string]: Encoding;
  };
}
export interface ParameterWithContentNotInPath {
  name: string;
  in: "query" | "header" | "cookie";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  content: {
    [k: string]: MediaType;
  };
}
export interface RequestBody {
  description?: string;
  content: {
    [k: string]: MediaType;
  };
  required?: boolean;
}
export interface Responses {
  default?: Response | Reference;
}
export interface Response {
  description: string;
  headers?: {
    [k: string]: Header | Reference;
  };
  content?: {
    [k: string]: MediaType;
  };
  links?: {
    [k: string]: Link | Reference;
  };
}
export interface LinkWithOperationRef {
  operationRef?: string;
  parameters?: {
    [k: string]: any;
  };
  requestBody?: any;
  description?: string;
  server?: Server;
}
export interface LinkWithOperationId {
  operationId?: string;
  parameters?: {
    [k: string]: any;
  };
  requestBody?: any;
  description?: string;
  server?: Server;
}
export interface Callback {
  [k: string]: PathItem;
}
export interface Components {
  schemas?: {
    [k: string]: any;
  };
  responses?: {
    [k: string]: any;
  };
  parameters?: {
    [k: string]: any;
  };
  examples?: {
    [k: string]: any;
  };
  requestBodies?: {
    [k: string]: any;
  };
  headers?: {
    [k: string]: any;
  };
  securitySchemes?: {
    [k: string]: any;
  };
  links?: {
    [k: string]: any;
  };
  callbacks?: {
    [k: string]: any;
  };
}
export interface ApiKeySecurityScheme {
  type: "apiKey";
  name: string;
  in: "header" | "query" | "cookie";
  description?: string;
}
export interface NonBearerHttpSecurityScheme {
  scheme: string;
  description?: string;
  type: "http";
}
export interface BearerHttpSecurityScheme {
  scheme: "bearer";
  bearerFormat?: string;
  type: "http";
  description?: string;
}
export interface OAuth2SecurityScheme {
  type: "oauth2";
  flows: OAuthFlows;
  description?: string;
}
export interface OAuthFlows {
  implicit?: ImplicitOAuthFlow;
  password?: PasswordOAuthFlow;
  clientCredentials?: ClientCredentialsFlow;
  authorizationCode?: AuthorizationCodeOAuthFlow;
}
export interface ImplicitOAuthFlow {
  authorizationUrl: string;
  refreshUrl?: string;
  scopes: {
    [k: string]: string;
  };
}
export interface PasswordOAuthFlow {
  tokenUrl: string;
  refreshUrl?: string;
  scopes?: {
    [k: string]: string;
  };
}
export interface ClientCredentialsFlow {
  tokenUrl: string;
  refreshUrl?: string;
  scopes?: {
    [k: string]: string;
  };
}
export interface AuthorizationCodeOAuthFlow {
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl?: string;
  scopes?: {
    [k: string]: string;
  };
}
export interface OpenIdConnectSecurityScheme {
  type: "openIdConnect";
  openIdConnectUrl: string;
  description?: string;
}