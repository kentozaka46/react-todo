import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();

  // 入力されたメールアドレスを格納するステート
  const [email, setEmail] = useState<string>("");
  // 入力されたパスワードを格納するステート
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, email, password).then(
      (userCredential) => {
        navigate("/");
        const user = userCredential.user;
      }
    );
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
        <div>
          <button>ログイン</button>
        </div>
      </form>
      <div>
        ユーザ登録は<Link to={"/signUp"}>こちら</Link>から
      </div>
    </div>
  );
};

export default Login;
