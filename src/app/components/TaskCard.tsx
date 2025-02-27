import { Draggable } from "@hello-pangea/dnd";

interface TaskProps {
  task: { id: number; todo: string };
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, index, onEdit, onDelete }: TaskProps) {
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-2 bg-white rounded shadow mb-2 flex justify-between items-center"
        >
          <span className="flex-1 mr-1">{task.todo}</span>
          <button onClick={onEdit} className="text-blue-500 w-9">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3b82f6" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path></svg>
          </button>
          <button onClick={onDelete} className="text-blue-500 w-7">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF0000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
          </button>
        </div>
      )}
    </Draggable>
  );
}