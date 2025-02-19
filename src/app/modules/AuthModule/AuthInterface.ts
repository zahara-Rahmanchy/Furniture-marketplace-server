export interface ILoginUser {
  username: string;
  password: string;
}

export interface IReqUser {
  username: string;
  role: 'seller' | 'buyer';
  iat: number;
  exp: number;
}
