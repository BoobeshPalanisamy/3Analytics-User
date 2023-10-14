import { ReactNode, useContext } from "react";
import { useState, createContext } from "react";
import { IAuthContext, IUser } from "../interface/types";

// Create an AuthContext using createContext with initial default values
const AuthContext = createContext<IAuthContext>({
  user: {
    userId: null,
    phoneNumber: null,
    name: null,
  },
  updateUserData: () => {},
});

// Create an AuthProvider component that wraps its children with AuthContext
function AuthProvider({ children }: { children: ReactNode }) {
  // State to store user information, initially set to null
  const [user, setuser] = useState<IUser | null>(null);

  // Function to update user data within the state
  const updateUserData = (user: IUser | null) => {
    if (user) {
      setuser({
        ...user,
      });
    } else {
      setuser(null);
    }
  };

  // Create a context value containing user and updateUserData
  const contextValue: IAuthContext = {
    user,
    updateUserData,
  };

  // Provide the context value to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Create a custom hook for easily accessing the AuthContext
export function useAuthContext() {
  const context = useContext<IAuthContext>(AuthContext);
  return context;
}

// Export the AuthProvider component as the default export
export default AuthProvider;
