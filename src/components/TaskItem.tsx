import { TaskItemProps } from "../types/Types";

/**
 * タスク1つを表すコンポーネント
 * @author K.Kento
 */
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  handleDone,
  handleDelete,
}) => {
  return (
    <li className={task.done ? "done" : ""}>
      <label>
        <input
          className="checkbox-input"
          type="checkbox"
          onClick={() => handleDone(task)}
          defaultChecked={task.done}
        />
        <span className="checkbox-label">{task.title}</span>
      </label>
      <button className="delete-btn" onClick={() => handleDelete(task)}>
        削除
      </button>
    </li>
  );
};

export default TaskItem;
