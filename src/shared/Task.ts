import { Entity, Fields, Validators } from "remult";

@Entity("tasks", {
  allowApiCrud: true,
})
export class Task {
  @Fields.uuid()
  id!: string;

  @Fields.string<Task>({
    validate: (task: Task) => {
      if (task.title.length < 3) {
        return "Title must be at least 3 characters long";
      }
    },
  })
  title = "";

  @Fields.boolean()
  completed = false;
}
