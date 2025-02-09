// #Sign-In Interface
export interface ISignInData {
  email: string;
  password: string;
}

export interface IFailSignInResponse {
  statusMsg: string;
  message: string;
  token: string;
}

export interface ISuccessSignInResponse {
  message: string;
  user: IUser;
  token: string;
}

// #Sign-Up Interface
export interface ISignUpData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ISuccessSignUpResponse {
  message: string;
  user: IUser;
  token: string;
}

export interface IFailSignUpResponse {
  statusMsg: string;
  message: string;
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
}

// Token
export interface IToken {
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: string;
}

// Verify Token

export interface IVerifyTokenResponse {
  message: string;
  user: IUser;
}

// #Reset Password Interface

export interface IForgottenPasswordData {
  email: string;
}

export interface IForgottenPasswordResponse {
  statusMsg: string;
  message: string;
}

export interface ISubmitCodeData {
  resetCode: string;
}

export interface ISubmitCodeResponse {
  status?: string;
  statusMsg?: string;
  message?: string;
}

// #Change Password Interface

export interface IChangePasswordData {
  email: string;
  newPassword: string;
}

export interface IChangePasswordResponse extends ISubmitCodeResponse {}

// Change Password Interface
export interface IChangePassword {
  message: string;
  user: IUser;
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
}

export interface IFailChange {
  statusMsg: string;
  message: string;
}
