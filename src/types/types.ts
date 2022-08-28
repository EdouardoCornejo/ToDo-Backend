import { User } from '@prisma/client';
import { Request as RequestBase } from 'express';

interface Request extends RequestBase {
  user: User;
}

export default Request;
