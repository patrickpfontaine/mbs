import { useState, useEffect } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import { ref, set } from "firebase/database";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signUp = async (
    name: string,
    email: string,
    password: string,
    homeAddress: string,
    phoneNum: string
  ) => {
    const user = (await createUserWithEmailAndPassword(auth, email, password))
      .user;

    // Store additional user information in the Realtime Database
    await set(ref(database, "users/" + user.uid), {
      name: name,
      email: email,
      homeAddress: homeAddress,
      phoneNum: phoneNum,
    });

    return user;
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  return { user, signUp, signIn, logOut };
}
