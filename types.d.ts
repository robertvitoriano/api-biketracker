declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      name: any;
      username: any;
      email: any;
      password: any;
      avatar: any;
    };
    token: string;
  }
}
