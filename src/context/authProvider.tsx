import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { firebaseAuth } from "../firebase";

type AuthContextProps = {
  currentUser: User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
});

// TODO childrenの型修正
const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  // ログイン状態を確認する
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  });

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
