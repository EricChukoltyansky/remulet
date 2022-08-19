import React, { useEffect, useState } from "react";
import { remult } from "./common";
import { Task } from "./shared/Task";
import "./App.css";

const taskRepo = remult.repo(Task);

async function fetchTasks(hideCompleted: boolean) {
  return await taskRepo.find({
    limit: 20,
    orderBy: { completed: "asc" },
    where: { completed: hideCompleted ? false : undefined },
  });
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    fetchTasks(hideCompleted).then(setTasks);
  }, [hideCompleted]);
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <input type="checkbox" checked={task.completed} />
          {task.title}
        </div>
      ))}
    </div>
  );
}

export default App;
