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
  // タスクを完了にしたときの処理
  const handleDone = (task: Task) => {
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

  // タスクを削除したときの処理
  const handleDelete = (task: Task) => {
    setTasks((prev) =>
      prev.filter((t) => {
        return t.id !== task.id;
      })
    );
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
