import { SetMetadata, applyDecorators } from '@nestjs/common';

// Define the constant key for metadata
export const TRANSACTIONAL_KEY = 'transactional';

// The decorator function
export function Transactional(): MethodDecorator & ClassDecorator;
// The actual implementation for `@Transactional` with and without parentheses
export function Transactional(target?: any, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) {
    if (target && propertyKey) {
        // Called as `@Transactional`
        // Directly apply the metadata when used without parentheses
        return SetMetadata(TRANSACTIONAL_KEY, true)(target, propertyKey, descriptor);
    } else {
        // Called as `@Transactional()`
        return applyDecorators(SetMetadata(TRANSACTIONAL_KEY, true));
    }
}
