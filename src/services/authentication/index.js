import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { app } from "../../config/firebase.config";

const auth = getAuth(app);
export const register = (email, password, displayName, setUser) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.displayName = displayName;
      setUser(user);
      return user.updateProfile({
        displayName: displayName,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

export const login = (email, password, setUser) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
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
