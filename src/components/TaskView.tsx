import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../firebase";
import { Task } from "../types/Types";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";

/**
 * TODO入力、TODOリストをまとめたコンポーネント
 * @author K.Kento
 */
const TaskView: React.FC = () => {
  // TODOリストを格納するステート
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigate = useNavigate();
  const handleLogout = () => {
    firebaseAuth.signOut();
    navigate("/login");
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
      <TaskInput setTasks={setTasks} tasks={tasks} />
      <TaskList setTasks={setTasks} tasks={tasks} />
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
};

export default TaskView;
