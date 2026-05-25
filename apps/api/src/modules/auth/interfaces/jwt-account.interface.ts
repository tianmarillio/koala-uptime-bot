import { Request } from 'express';

export interface JwtAccountInput {
  id: string;
  username: string;
}

export interface JwtAccountOutput extends JwtAccountInput {
  exp: number;
  iat: number;
}

export interface RequestWithJwtAccount extends Request {
  user: JwtAccountOutput;
}
