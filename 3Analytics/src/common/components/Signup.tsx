import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ISignUp, ISignUpFormFields } from "../../interface/types";
import { signUp } from "../../services/api";
import { useAuthContext } from "../../context/AuthContext";
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
  confirmPassword: yup
    .string()
    .required("confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  email: yup.string().email("Please enter a valid email"),
  name: yup.string().required("Please enter Name"),
});

function Signup() {
  // Access the navigation object
  const navigate = useNavigate();
  // Access the updateUserData function from the authentication context
  const { updateUserData } = useAuthContext();

  // Initialize the react-hook-form with the schema and mode
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormFields>({
    resolver: yupResolver(schema) as any,
    mode: "all",
  });

  // Function to navigate to the login page
  const moveToLogin = () => {
    navigate(paths.LOGIN);
  };

  // Function to handle the sign-up form submission
  const handleSign = async (data: ISignUpFormFields) => {
    if (data) {
      // Prepare the sign-up data and include a "role" property
      var signUpFormData = {
        ...data,
        role: "user",
      } as ISignUp;
      await signUp(signUpFormData)
        .then((response) => {
          if (response.data) {
            // Update user data in the authentication context
            updateUserData({
              ...response.data,
            });
            // Redirect to the home page
            navigate(paths.ROOT);
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.log(error.response.data);
          }
        });
    }
  };

  return (
    <Container>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        padding="20px 0px 10px 0px"
      >
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(handleSign)}>
        <Box paddingBottom="20px">
          <Box sx={{ padding: "7px 0" }}>
            <Typography padding="5px 0px">
              Name<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              inputProps={{ style: { padding: "10px" } }}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message?.toString()}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
              autoComplete="new"
            />
          </Box>
          <Box sx={{ padding: "7px 0" }}>
            <Typography padding="5px 0px">
              PhoneNumber<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              inputProps={{ style: { padding: "10px" } }}
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message?.toString()}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
              autoComplete="new"
              type="tel"
            />
          </Box>
          <Box sx={{ padding: "7px 0" }}>
            <Typography padding="5px 0px">Email</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              type="email"
              inputProps={{ style: { padding: "10px" } }}
              {...register("email")}
              helperText={errors.email?.message?.toString()}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
              autoComplete="new"
            />
          </Box>
          <Box sx={{ padding: "7px 0" }}>
            <Typography padding="5px 0px">
              Password<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              inputProps={{ style: { padding: "10px" } }}
              {...register("password")}
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message?.toString()}
              FormHelperTextProps={{ sx: { margin: "0px" } }}
            />
          </Box>
          <Box sx={{ padding: "7px 0" }}>
            <Typography padding="5px 0px">
              Confirm Password<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              inputProps={{ style: { padding: "10px" } }}
              {...register("confirmPassword")}
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message?.toString()}
              FormHelperTextProps={{ sx: { margin: "0px" } }}
            />
          </Box>
        </Box>
        <Button variant="contained" fullWidth type="submit">
          Sign up
        </Button>
        <FormHelperText
          onClick={moveToLogin}
          sx={{ textAlign: "center", paddingTop: "5px" }}
        >
          <Box sx={{ cursor: "pointer" }}>
            Already have an Account?
            <br />
            Please &nbsp;
            <Link>Login</Link>
          </Box>
        </FormHelperText>
      </form>
    </Container>
  );
}

export default Signup;
