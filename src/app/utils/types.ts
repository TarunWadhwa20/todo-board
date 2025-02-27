export interface Task {
    id: number;
    todo: string;
    completed: boolean;
    status: "todo" | "pending" | "in-progress" | "done"; // New field
  }