import { createUserWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";
import { loginInput } from "../../types/Types";

/**
 * サインアップ画面のコンポーネント
 * @author K.Kento
 */
const SignUp = () => {
  const navigate = useNavigate();

  // React Hook Formで使う定数の宣言
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInput>({ mode: "onChange", criteriaMode: "all" });

  // ユーザー作成の処理
  const onSubmit: SubmitHandler<loginInput> = (data) => {
    createUserWithEmailAndPassword(
      firebaseAuth,
      data.address,
      data.password
    ).then((userCredential) => {
      navigate("/login");
      alert("登録が完了しました！");
    });
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>メールアドレス</label>
          <input
            type="aaa@test.com"
            placeholder="email"
            {...register("address", { required: true })}
          />
          <p style={{ color: "red" }}>
            {errors.address && "メールアドレスを入力してください"}
          </p>
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit);
              }
            }}
          />
          <p style={{ color: "red" }}>
            {errors.password?.types?.required && "パスワードを入力してください"}
            {errors.password?.types?.minLength && "6文字以上で設定してください"}
          </p>
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
