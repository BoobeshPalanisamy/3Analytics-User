import { AppBar, IconButton, Toolbar, Tooltip } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { logOut } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../paths/paths";

// The Navbar component responsible for rendering the application's navigation bar
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle the logout button click
  const handleLogoutClick = async () => {
    await logOut()
      .then((response) => {
        if (response.status) {
          navigate(paths.LOGIN); // Redirect to the login page after successful logout
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  const isLoginPage =
    location.pathname === paths.LOGIN || location.pathname === paths.SIGNUP;

  return (
    <>
      <AppBar sx={{ position: "static" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <h1>3Analytics</h1>
          {!isLoginPage && (
            <Tooltip title="Logout" placement="bottom" arrow>
              <IconButton onClick={handleLogoutClick}>
                <Logout sx={{ fontSize: "30px", color: "white" }} />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
