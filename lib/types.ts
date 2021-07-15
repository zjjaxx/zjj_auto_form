export enum SchemaType {
  "STRING" = "string",
  "NUMBER" = "number",
  "OBJECT" = "object",
  "INTEGER" = "integer",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean",
}
export const SchemaItemKey = Symbol();
export interface ObjectType {
  [propName: string]: unknown;
}
type SchemaRef = { $ref: string };
export interface Schema {
  type?: SchemaType | string;
  const?: any;
  format?: string;

  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema;
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[];
  enum?: any[];
  enumNames?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}
