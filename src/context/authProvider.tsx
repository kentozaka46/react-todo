import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { firebaseAuth } from "../firebase";

type AuthContextProps = {
  currentUser: User | null | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  loading: true,
  setLoading: () => {},
});

// TODO childrenの型修正
const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);

  // ログイン状態を確認する
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AuthContext.Provider value={{ currentUser, loading, setLoading }}>
          {!loading && children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export { AuthContext, AuthProvider };
