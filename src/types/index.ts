export interface JwtPayload {
  email: string;
  sub: number;
  type: 'provider' | 'client';
}