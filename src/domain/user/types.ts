export interface IUserCredentials {
  password?: string;
  username?: string;
  email?: string;
}

export interface IUser {
  _id?: string;
  username: string;
  confirmed?: Boolean;
  name: string;
  email?: string;
  avatar?: string;
  weight?: number;
  receivedEmail?: boolean;
  emailAttempts?: number;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
