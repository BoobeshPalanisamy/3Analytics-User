import {
  Box,
  TextField,
  Typography,
  Button,
  FormHelperText,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { login } from "../../services/api";
import { ILoginFormInputs } from "../../interface/types";
import { useAuthContext } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { paths } from "../../paths/paths";

// Define a schema for form validation using yup
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required()
    .typeError("Please enter the PhoneNumber")
    .matches(
      /[6-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{1}/,
      "Please enter a valid phone number"
    )
    .max(10),
  password: yup.string().required("Password is required"),
});

function Login() {
  // Access the navigation object
  const navigate = useNavigate();
  // Access the updateUserData function from the authentication context
  const { updateUserData } = useAuthContext();

  // Initialize the react-hook-form with the schema and mode
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // Function to handle the login form submission
  const handleLogin = async (data: ILoginFormInputs) => {
    await login(data)
      .then((response) => {
        if (response.data) {
          // Update user data in the authentication context
          updateUserData({
            ...response.data,
          });
          // Redirect to the home page
          navigate(paths.ROOT);
        } else {
          // Clear user data in the authentication context
          updateUserData(null);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  // Function to handle clicking the registration link
  const handleRegisterLinkClick = () => {
    // Navigate to the registration page
    navigate(paths.SIGNUP);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Box>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Typography>
            PhoneNumber<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="tel"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message?.toString()}
            FormHelperTextProps={{
              sx: { color: "red", marginLeft: "0px" },
            }}
            autoComplete="new"
            required
          />
          <Typography>
            Password<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            autoComplete="new"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
            type="submit"
          >
            Login
          </Button>
          <FormHelperText sx={{ textAlign: "center", paddingTop: "5px" }}>
            <Box sx={{ cursor: "pointer" }}>
              Don't have an Account?
              <br /> Please &nbsp;
              <Link onClick={handleRegisterLinkClick}>Register</Link>
            </Box>
          </FormHelperText>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
