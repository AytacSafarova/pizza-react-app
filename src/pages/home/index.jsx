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
    </>
  );
};

export default Home;
