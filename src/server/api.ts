import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { TasksController } from "../shared/TasksController";

export const api = remultExpress({
  entities: [Task],
  controllers: [TasksController],
  initApi: async (remult: any) => {
    const taskRepo = remult.repo(Task);
    if ((await taskRepo.count()) === 0) {
      await taskRepo.insert([
        { title: "Buy milk", completed: false },
        { title: "Buy eggs", completed: false },
        { title: "Buy bread", completed: false },
      ]);
    }
  },
});
