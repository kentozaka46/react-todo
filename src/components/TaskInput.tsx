import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { firebaseFirestore } from "../firebase";
import { TaskInputProps } from "../types/Types";

/**
 * タスクの入力欄のコンポーネント
 * @author K.Kento
 */
const TaskInput: React.FC<TaskInputProps> = ({ setTasks, tasks }) => {
  const dispatch = useDispatch();

  // 入力したタイトルを格納するステート
  const [inputTitle, setInputTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  // idをカウントするステート
  const [count, setCount] = useState<number>(tasks.length + 1);
  // タスクが完了しているかどうかのステート
  const [complete, setComplete] = useState<boolean>(false);

  // タイトルが入力されたときの処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  // 追加ボタンが押されたときの処理
  const handleSubmit = () => {
    // idを1増やすためにステートを更新
    setCount(count + 1);

    // 追加される新しいタスク
    const newTask = {
      id: count,
      title: inputTitle,
      done: false,
    };

    // 追加されるタスクをステートにセット
    setTasks([newTask, ...tasks]);

    // データベースに格納
    addDoc(collection(firebaseFirestore, "todos"), {
      id: count,
      title: inputTitle,
      done: false,
    });

    // 追加されたらタイトルの入力欄を空にする
    setInputTitle("");
  };

  // Reduxでタスクを追加する処理
  const addList = () => {
    if (!name) return;
    setComplete(false);
    dispatch({
      type: "ADD_LIST",
      payload: {
        name,
        complete,
      },
    });
    setName("");
  };

  return (
    <div className="input-form">
      <div className="input-cotainer">
        <h1>TODO登録</h1>
        <input
          className="task-input"
          type="text"
          value={inputTitle}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          autoFocus
        />
        <button className="input-btn" onClick={handleSubmit}>
          追加
        </button>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addList}>追加</button>
      </div>
    </div>
  );
};

export default TaskInput;
