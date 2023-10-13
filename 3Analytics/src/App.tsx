import "./App.css";
import { Route, Routes } from "react-router-dom";
import { paths } from "./paths/paths";
import Layout from "./common/Layout";
import Login from "./common/components/Login";
import Signup from "./common/components/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./common/components/PrivateRoute";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path={paths.ROOT} element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path={paths.LOGIN} element={<Login />} />
            <Route path={paths.SIGNUP} element={<Signup />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
