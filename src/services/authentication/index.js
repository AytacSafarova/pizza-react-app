import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { app } from "../../config/firebase.config";

const auth = getAuth(app);
export const register = async (email, password, displayName, setUser) => {
  let result = null;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.displayName = displayName;
      setUser(user);
      result = "success";
      // return user.updateProfile({
      //   displayName: displayName,
      // });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      result = errorCode;
    });
  return result;
};

export const login = async (email, password, setUser) => {
  let result = null;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user);
      result = "success";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      result = errorCode;
    });
  return result;
};

export const logOut = (setUser) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
      setUser(null);
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

export const getCurrentUserWithCredentials = (user, setUser) => {
  if (!user && auth.currentUser) setUser(auth.currentUser);
};
