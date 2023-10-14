import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box, Toolbar } from "@mui/material";

// The Layout component represents the common layout structure of the application
function Layout() {
  return (
    <>
      <Navbar /> {/* Render the navigation bar at the top of the layout */}
      <Toolbar />
      {/* Provide spacing below the navigation bar */}
      <Box>
        <Outlet />
        {/* Render the content of the current route inside a Box */}
      </Box>
    </>
  );
}

export default Layout;
