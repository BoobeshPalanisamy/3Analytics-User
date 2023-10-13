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
  const navigate = useNavigate();
  const { updateUserData } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const handleLogin = async (data: ILoginFormInputs) => {
    await login(data)
      .then((response) => {
        if (response.data) {
          updateUserData({
            ...response.data,
          });
          navigate(paths.ROOT);
        } else {
          updateUserData(null);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  const handleRegisterLinkClick = () => {
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
