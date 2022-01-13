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
    const userCollectionRef = collection(firebaseFirestore, "todos");
    const q = query(userCollectionRef, where("id", "==", task.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const userDocumentRef = doc(firebaseFirestore, "todos", document.id);
      await updateDoc(userDocumentRef, { done: !task.done });
    });

    // チェックがついているかどうかのステートを書き換える
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === task.id) {
          return { ...task, done: !task.done };
        } else {
          return t;
        }
      })
    );
  };

  // タスクをfirebaseから削除する処理
  const handleDelete = async (task: Task) => {
    const userCollectionRef = collection(firebaseFirestore, "todos");
    const q = query(userCollectionRef, where("id", "==", task.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const userDocumentRef = doc(firebaseFirestore, "todos", document.id);
      await deleteDoc(userDocumentRef);
    });

    // ステートを書き換えて、リアルタイムでTODOリストを更新する
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
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
