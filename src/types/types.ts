import { User } from '@prisma/client';
import { Request as RequestBase } from 'express';

/* Extending the RequestBase interface with a user property. */
interface Request extends RequestBase {
  user: User;
}

export default Request;
