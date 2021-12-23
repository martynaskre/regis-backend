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
  RATE_BUSINESS = 'business/rate/',
}

export enum Days {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7,
}

export interface BookingEntry {
  type: 'taken-provider' | 'taken-client' | 'default';
  reservedTime: Date;
  duration: number;
  title?: string;
  description?: string;
  id?: number;
}
