import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuthContext } from "../context/AuthContext";
import { logOut } from "../services/authentication";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  const { user, setUser } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#756e6c" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PIZZZAAAAAA
          </Typography>
          {user ? (
            <>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "right",
                  fontSize: 16,
                  marginRight: 2,
                }}
              >
                {user.displayName}
              </Typography>
              <Button color="inherit" onClick={() => logOut(setUser)}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="register">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
