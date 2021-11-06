import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hash(value: string): Promise<string> {
  return await bcrypt.hash(value, saltRounds);
}

export async function compareHash(
  value: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(value, hash);
}

export function formatResponse(message: string, data?: any) {
  return {
    message,
    data,
  };
}
