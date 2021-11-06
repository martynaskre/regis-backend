import { Request } from 'express';
import { ProviderEntity } from '../provider/provider.entity';

export interface RequestWithProvider extends Request {
  provider: ProviderEntity;
}
