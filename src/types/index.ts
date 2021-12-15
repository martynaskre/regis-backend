
export interface JwtPayload {
  email: string;
  sub: number;
  type: 'provider' | 'client';
}

export enum FrontEndpoint {
  CLIENT_LOGIN = 'auth/login/client',
  PROVIDER_LOGIN = 'auth/login/provider',
  CLIENT_PASSWORD_RESET = 'auth/reset-password/client',
  PROVIDER_PASSWORD_RESET = 'auth/reset-password/provider',
  CATEGORY_ILLUSTRATIONS = 'assets/img/categories/',
}

export enum Days {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export interface BookingEntry{
  reservedTime: Date;
  duration: number;
  title?: string;
  description?: string;
}