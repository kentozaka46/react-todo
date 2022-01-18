import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../../firebase";

const SignUp = () => {
  // 入力されたメールアドレスを格納するステート
  const [email, setEmail] = useState<string>("");
  // 入力されたパスワードを格納するステート
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
      }
    );
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
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
          <button>登録</button>
        </div>
      </form>
      <div>
        <Link to={"/login"}>ログイン画面へ</Link>
      </div>
    </div>
  );
};

export default SignUp;
