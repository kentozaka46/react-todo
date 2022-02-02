import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../firebase";
import { Task } from "../types/Types";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import { deleteUser, getAuth } from "firebase/auth";

/**
 * TODO入力、TODOリストをまとめたコンポーネント
 * @author K.Kento
 */
const TaskView: React.FC = () => {
  const { currentUser, setLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginUser = getAuth().currentUser;

  // ToDoリストを格納するステート
  const [tasks, setTasks] = useState<Task[]>([]);

  // ログアウトの処理
  const onLogout = () => {
    firebaseAuth.signOut();
    navigate("/login");
    setLoading(false);
    alert("ログアウトしました！");
  };

  // アカウント削除の処理
  const deleteAccount = () => {
    if (loginUser) {
      deleteUser(loginUser).then(() => {
        navigate("/login");
        setLoading(false);
        alert("アカウントを削除しました");
      });
    }
  };

  // firebaseに格納されているTODOリストを取得する処理
  useEffect(() => {
    const todos = collection(firebaseFirestore, "todos");
    getDocs(todos).then((todo) =>
      setTasks(
        todo.docs.map((doc) => {
          return {
            id: doc.data().id,
            title: doc.data().title,
            done: doc.data().done,
          };
        })
      )
    );
  }, []);

  return (
    <>
      {!currentUser ? (
        <Navigate to="/login" />
      ) : (
        <>
          <TaskInput setTasks={setTasks} tasks={tasks} />
          <TaskList setTasks={setTasks} tasks={tasks} />
          <div>
            <button onClick={onLogout}>ログアウト</button>
          </div>
          <div>
            <button onClick={deleteAccount}>アカウント削除</button>
          </div>
        </>
      )}
    </>
  );
};

export default TaskView;
