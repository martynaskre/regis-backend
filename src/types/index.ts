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
  MONDAY = 'Pirmadienis',
  TUESDAY = 'Antradienis',
  WEDNESDAY = 'Trečiadienis',
  THURSDAY = 'Ketvirtadienis',
  FRIDAY = 'Penktadinies',
  SATURDAY = 'Šeštadienis',
  SUNDAY = 'Sekmadienis',
}
