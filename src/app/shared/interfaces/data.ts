// #Sign-In Interface
export interface signInData {
  email: string;
  password: string;
}

// #Sign-Up Interface
export interface signUpData extends signInData {
  name: string;
  rePassword: string;
  phone: string;
}

export interface ApiFailResponse {
  statusMsg: string;
  message: string;
}

export interface ApiSuccessResponse {
  message: string;
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}
