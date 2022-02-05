import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { firebaseFirestore } from "../firebase";
import { Task, TaskListProps } from "../types/Types";
import TaskItem from "./TaskItem";

/**
 * タスクのリストのコンポーネント
 * @author K.Kento
 */
const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const dispatch = useDispatch();
  // Storeに保管されているToDoリストの取得
  const lists = useSelector(
    (state: {
      lists: {
        name: string;
        complete: boolean;
      }[];
    }) => state.lists
  );

  // タスクを完了に変更する処理
  const doneList = (name: string) => {
    dispatch({ type: "DONE_LIST", payload: name });
  };

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

  // タスクを削除する処理
  const deleteList = (name: string) => {
    dispatch({ type: "DELETE_LIST", payload: name });
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
      <h2>未完了のTodoリスト</h2>
      <ul>
        {lists
          .filter((list) => list.complete === false)
          .map((list, index) => (
            <div key={index}>
              {list.name}
              <button onClick={() => doneList(list.name)}>完了</button>
              <button onClick={() => deleteList(list.name)}>削除</button>
            </div>
          ))}
      </ul>
      <h2>完了したTodoリスト</h2>
      <ul>
        {lists
          .filter((list) => list.complete === true)
          .map((list, index) => (
            <div key={index}>{list.name}</div>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
