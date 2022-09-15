import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { register as registerFunc } from "../../services/authentication";

const theme = createTheme();
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    confirmPassword: yup.string().min(8).max(32).required(),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async ({
    email,
    confirmPassword,
    name,
    surname,
    password,
  }) => {
    setLoading(true);
    if (confirmPassword !== password) {
      setError("confirmPassword", {
        type: "custom",
        message: "Passwords are not same",
      });
      return;
    }
    let res = await registerFunc(
      email,
      password,
      `${name} ${surname}`,
      setUser
    );
    setLoading(false);
    if (res === "success") {
      navigate("/");
    } else {
      setError("confirmPassword", { type: "custom", message: res });
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600628421055-4d30de868b8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            style={{ padding: 130, paddingTop: 70 }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                <LocalPizzaIcon></LocalPizzaIcon>
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmitHandler)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name:"
                  autoComplete="name"
                  {...register("name")}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="surname"
                  label="Surname:"
                  autoComplete="surname"
                  {...register("surname")}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  {...register("email")}
                />
                <span style={{ color: "red" }}>{errors.email?.message} </span>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                />
                <span style={{ color: "red" }}>
                  {errors.password?.message}{" "}
                </span>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  {...register("confirmPassword")}
                />
                <span style={{ color: "red" }}>
                  {errors.password?.message}{" "}
                </span>

                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up{" "}
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Register;
