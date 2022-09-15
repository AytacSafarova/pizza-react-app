import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../context/AuthContext";
import {
  getCurrentUserWithCredentials,
  login,
  logOut,
  register,
} from "../../services/authentication";

const Home = () => {
  const { user, setUser } = useAuthContext();
  useEffect(() => getCurrentUserWithCredentials(user, setUser), []);

  return (
    <>
      <Navbar />
      <div>
        {user ? "var" : "yoxdur"}
        <button
          onClick={() =>
            register(
              "deneme3@gmail.com",
              "salam123",
              "Suleyman Dadashov",
              setUser
            )
          }
        >
          Register
        </button>
        <button onClick={() => login("deneme3@gmail.com", "salam123", setUser)}>
          Login
        </button>
        <button onClick={() => logOut(setUser)}>Logout</button>
        <button onClick={() => getCurrentUserWithCredentials(user, setUser)}>
          Current User
        </button>
        Home
      </div>
    </>
  );
};

export default Home;
