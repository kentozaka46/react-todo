import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseFirestore } from "../firebase";
import { Task } from "../type/Types";
import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

/**
 * タスクのリストのコンポーネント
 * @author K.Kento
 */
const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {
  // タスクのチェックを入れたり外したりする処理
  const handleDone = async (task: Task) => {
    const todos = collection(firebaseFirestore, "todos");
    const filteredTodos = query(todos, where("id", "==", task.id));
    const getFilteredTodos = await getDocs(filteredTodos);
    getFilteredTodos.forEach(async (document) => {
      const updateTodos = doc(firebaseFirestore, "todos", document.id);
      await updateDoc(updateTodos, { done: !task.done });
    });

    // チェックがついているかどうかのステートを書き換える
    setTasks((prev) =>
      prev.map((value) => {
        if (value.id === task.id) {
          return { ...task, done: !task.done };
        } else {
          return value;
        }
      })
    );
  };

  // タスクをfirebaseから削除する処理
  const handleDelete = async (task: Task) => {
    const todos = collection(firebaseFirestore, "todos");
    const filteredTodos = query(todos, where("id", "==", task.id));
    const getFilteredTodos = await getDocs(filteredTodos);
    getFilteredTodos.forEach(async (document) => {
      const deleteTodos = doc(firebaseFirestore, "todos", document.id);
      await deleteDoc(deleteTodos);
    });

    // ステートを書き換えて、リアルタイムでTODOリストを更新する
    setTasks((prev) => prev.filter((value) => value.id !== task.id));
  };

  return (
    <div className="tasklist-container">
      {tasks.length <= 0 ? (
        "タスクの登録がありません"
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleDone={handleDone}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
