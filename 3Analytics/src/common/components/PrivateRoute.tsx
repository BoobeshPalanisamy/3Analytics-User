import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { ReactNode, useEffect } from "react";
import { isAuthorized } from "../../services/api";
import { paths } from "../../paths/paths";

// A PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  // Access the authentication context
  const { user, updateUserData } = useAuthContext();
  // Access the navigation object
  const navigate = useNavigate();

  // Use useEffect to check user authorization when the component mounts
  useEffect(() => {
    checkAuthorization();
  }, []);

  // Function to check user authorization
  const checkAuthorization = async () => {
    try {
      const user = await isAuthorized();

      if (!user) {
        navigate(paths.LOGIN); // Redirect to login page if not authorized
      } else {
        updateUserData({ ...user });
        navigate(paths.ROOT); // Redirect to the root page after authorization
      }
    } catch (error) {
      console.error("Error checking authorization:", error);
      navigate(paths.LOGIN); // Redirect to login page if an error occurs
    }
  };

  // Render the children (protected content) if the user is authenticated
  return user && <>{children}</>;
};

export default PrivateRoute;
