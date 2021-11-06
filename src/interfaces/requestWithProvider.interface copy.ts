import { Request } from 'express';
import { Client } from 'src/client/client.entity';

export interface RequestWithClient extends Request {
  client: Client;
}
