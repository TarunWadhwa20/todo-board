import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Task } from "../utils/types";

interface ColumnProps {
  columnId: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number, columnId: string) => void;
}

const columnTitles: Record<string, string> = {
    todo: "To Do",
    pending: "Pending",
    "in-progress": "In Progress",
    done: "Done",
  };

export default function Column({ columnId, tasks, onEditTask, onDeleteTask }: ColumnProps) {    
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="w-1/2 p-4 bg-gray-200 rounded-md">
          <h2 className="text-xl font-bold mb-2 capitalize">{columnTitles[columnId]}</h2>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} onEdit={() => onEditTask(task)} onDelete={() => onDeleteTask(task.id, columnId)} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
