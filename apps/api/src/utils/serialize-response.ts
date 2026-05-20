import { ClassConstructor, plainToInstance } from 'class-transformer';

export function serializeResponse<T, V>(cls: ClassConstructor<T>, data: V): T {
  return plainToInstance(cls, data, {
    excludeExtraneousValues: true,
  });
}
