import { z } from 'zod';

export function unwrapZodType(schema: any): any {
  if (
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  ) {
    const inner = schema._def.innerType || (typeof schema.unwrap === 'function' ? schema.unwrap() : undefined);
    return inner ? unwrapZodType(inner) : schema;
  }
  if (schema instanceof z.ZodEffects) {
    return unwrapZodType(schema.innerType());
  }
  return schema;
}

export function getBaseSchema(schema: z.ZodTypeAny): z.ZodObject<any, any, any> | null {
  const unwrapped = unwrapZodType(schema);
  if (unwrapped instanceof z.ZodObject) {
    return unwrapped;
  }
  console.error("getBaseSchema: Expected a ZodObject after unwrapping, but got:", unwrapped);
  return null;
}