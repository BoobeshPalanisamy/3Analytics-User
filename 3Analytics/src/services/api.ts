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

// Function to check if the user is authorized
const isAuthorized = async () => {
  try {
    const response = await httpWithCredentials.get<IUser>("/user/isAuthorized");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to perform user login
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

// Function to perform user registration (signup)
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

// Function to log the user out
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

// Function to retrieve chat messages between users
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

// Function to retrieve user data by user ID
const getUser = async (userId: string) => {
  try {
    const response = await httpWithCredentials.get<IChatUser[]>(
      `/user/getUser/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to send a chat message
const sendMessage = async (data: ISendMessage) => {
  try {
    const response = await httpWithCredentials.post<IGetMessages>(
      "/chat/chat",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Export the functions for use in other parts of the application
export {
  isAuthorized,
  login,
  signUp,
  logOut,
  getMessages,
  getUser,
  sendMessage,
};
