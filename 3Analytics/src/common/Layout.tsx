import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box, Toolbar } from "@mui/material";

function Layout() {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
