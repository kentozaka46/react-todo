// タスクの型
export type Task = {
    id: number
    title: string
    done: boolean
}

// タスク1つのpropsの型
export type TaskItemProps = {
    task: Task;
    handleDone: (task: Task) => void;
    handleDelete: (task: Task) => Promise<void>;
};

// タスク全てのpropsの型
export type TaskListProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

// タスク入力のpropsの型
export type TaskInputProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    tasks: Task[];
};

// ログイン時の入力値の型
export type loginInput = {
    address: string;
    password: string;
  };