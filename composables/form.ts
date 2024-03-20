import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export function useValidationSchema<T extends z.ZodRawShape>(fields: T) {
    return toTypedSchema(z.object(fields));
}
