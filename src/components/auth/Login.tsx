import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";
import { loginInput } from "../../types/Types";

/**
 * ログイン画面のコンポーネント
 * @author K.Kento
 */
const Login = () => {
  const navigate = useNavigate();

  // React Hook Formで使う定数の宣言
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInput>({ mode: "onChange", criteriaMode: "all" });

  // ログイン処理
  const onSubmit: SubmitHandler<loginInput> = (data) => {
    signInWithEmailAndPassword(firebaseAuth, data.address, data.password).then(
      (userCredential) => {
        navigate("/");
        alert("ログインしました！");
      }
    );
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            placeholder="email"
            {...register("address", { required: true })}
          />
          <br />
          <p style={{ color: "red" }}>
            {errors.address && "メールアドレスを入力してください"}
          </p>
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            {...register("password", { required: true })}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit);
              }
            }}
          />
          <br />
          <p style={{ color: "red" }}>
            {errors.password && "パスワードを入力してください"}
          </p>
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
