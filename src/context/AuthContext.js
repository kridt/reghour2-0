import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
