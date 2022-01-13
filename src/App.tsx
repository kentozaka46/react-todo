import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { firebaseFirestore } from "./firebase";
import { Task } from "./type/Types";

const App: React.FC = () => {
  // TODOリストを格納するステート
  const [tasks, setTasks] = useState<Task[]>([]);

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
    <div className="todo-container">
      <div className="todo-component">
        <TaskInput setTasks={setTasks} tasks={tasks} />
        <TaskList setTasks={setTasks} tasks={tasks} />
      </div>
    </div>
  );
};

export default App;
