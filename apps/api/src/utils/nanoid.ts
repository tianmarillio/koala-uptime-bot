import { customAlphabet } from 'nanoid';

const VALID_CHARS = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_`;

export function generateNanoid(length: number = 21): string {
  const nanoid = customAlphabet(VALID_CHARS);

  return nanoid(length);
}
