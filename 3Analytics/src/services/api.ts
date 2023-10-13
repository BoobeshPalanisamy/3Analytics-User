import {
  ILoginResponse,
  ILoginFormInputs,
  IUser,
  ISignUp,
  IGetMessages,
  IChatUser,
  ISendMessage,
} from "../interface/types";
import { httpWithCredentials } from "./http";

const isAuthorized = async () => {
  try {
    const response = await httpWithCredentials.get<IUser>("/user/isAuthorized");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (credential: ILoginFormInputs) => {
  try {
    const response = await httpWithCredentials.post<ILoginResponse>(
      "/user/login",
      credential
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signUp = async (credential: ISignUp) => {
  try {
    const response = await httpWithCredentials.post<ILoginResponse>(
      "/user/signup",
      credential
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logOut = async () => {
  try {
    const response = await httpWithCredentials.get<ILoginResponse>(
      "/user/logout"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getMessages = async (receiverId: string, senderId: string) => {
  try {
    const response = await httpWithCredentials.post<IGetMessages[]>(
      "/chat/getMessages",
      {
        sender: senderId,
        receiver: receiverId,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUser = async (userId: string) => {
  console.log(userId);

  try {
    const response = await httpWithCredentials.get<IChatUser[]>(
      `/user/getUser/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendMessage = async (data: ISendMessage) => {
  try {
    const response = await httpWithCredentials.post<IGetMessages>("/chat/chat",data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  isAuthorized,
  login,
  signUp,
  logOut,
  getMessages,
  getUser,
  sendMessage,
};
