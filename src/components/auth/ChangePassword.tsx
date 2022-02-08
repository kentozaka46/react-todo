import { createUserWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";
import { changePasswordInput, loginInput } from "../../types/Types";

/**
 * サインアップ画面のコンポーネント
 * @author K.Kento
 */
const ChangePassword = () => {
  const navigate = useNavigate();

  // React Hook Formで使う定数の宣言
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordInput>({ criteriaMode: "all" });

  // パスワード変更の処理
  const onSubmit: SubmitHandler<changePasswordInput> = (data) => {
    createUserWithEmailAndPassword(
      firebaseAuth,
      data.password,
      data.newPassword
    ).then((userCredential) => {
      navigate("/login");
      alert("パスワードを変更しました！");
    });
  };

  return (
    <div>
      <h1>パスワード変更</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>新しいパスワード</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p style={{ color: "red" }}>
            {errors.password?.types?.required && "パスワードを入力してください"}
            {errors.password?.types?.minLength && "6文字以上で設定してください"}
          </p>
        </div>
        <div>
          <label>新しいパスワード(確認)</label>
          <input
            type="password"
            {...register("newPassword", { required: true, minLength: 6 })}
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
          <button>変更</button>
        </div>
      </form>
      <div>
        <Link to={"/"}>TODO登録画面へ</Link>
      </div>
    </div>
  );
};

export default ChangePassword;
