export interface IUser {
  data?: IUser;
  userId: string | null;
  phoneNumber: string | null;
  name: string | null;
  iat?: number;
}

export interface ILoginResponse {
  data: IUser | null;
  message: string;
  status?: boolean;
}

export interface ILoginFormInputs {
  phoneNumber: string;
  password: string;
}

export interface ISignUp {
  phoneNumber: string | undefined;
  password: string;
  name: string;
  email?: string;
  confirmPassword: string;
  role?: string;
}

export interface IAuthContext {
  user: IUser | null;
  updateUserData: (user: IUser | null) => void;
}

export interface ISnackBarContextType {
  snackBarState: {
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: string;
  };
  updateSnackBarState: (
    isOpen: boolean,
    message: any,
    severity: string
  ) => void;
}

export interface ISignUpFormFields {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  email?: string;
  name: string;
}

export interface IGetMessages {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
}

export interface IChatUser {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}

export interface ISendMessage {
  sender: string;
  receiver: string;
  content: string;
}

