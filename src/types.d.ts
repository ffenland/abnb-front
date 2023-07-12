export interface IUser {
  username: string;
  email: string;
  avatar: string;
  isHost: boolean;
  gender: string;
  language: string;
  currency: string;
}
export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginFailure {
  error: string;
}
