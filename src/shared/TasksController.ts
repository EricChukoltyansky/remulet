import { BackendMethod, Remult } from "remult";
import { Task } from "../shared/Task";

export class TasksController {
  @BackendMethod({ allowed: true })
  static async setAll(completed: boolean, remult?: Remult) {
    const taskRepo = remult!.repo(Task);

    for (const task of await taskRepo.find()) {
      await taskRepo.save({ ...task, completed });
    }
  }
}
