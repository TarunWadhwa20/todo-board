"use client";
import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Modal from "./Modal";
import Column from "./Column";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/todo";
import Toast from "./Toast";
import { Task } from "../utils/types";

const initialColumns = {
    todo: [],
    pending: [],
    "in-progress": [],
    done: [],
  };

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>(initialColumns);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTodos().then((data) => {
      setTasks({
        todo: data.filter((task: Task) => task.status === "todo"),
        pending: data.filter((task: Task) => task.status === "pending"),
        "in-progress": data.filter((task: Task) => task.status === "in-progress"),
        done: data.filter((task: Task) => task.status === "done"),
      });
    });
  }, []);
 
const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Ignore if dropped outside
  
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) return; // No vertical movement
  
    // Get a copy of the current state
    const newTasks = { ...tasks };
  
    // Get the source and destination columns
    const sourceColumn = [...(newTasks[source.droppableId] || [])];
    const destColumn = [...(newTasks[destination.droppableId] || [])];
  
    if (source.index < 0 || source.index >= sourceColumn.length) return;
  
    // ✅ Extract `movedTask` BEFORE updating state
    const [movedTask] = sourceColumn.splice(source.index, 1);
    if (!movedTask) return;
  
    // ✅ Update task status
    movedTask.status = destination.droppableId as Task["status"];
  
    // ✅ Insert into destination column **at the correct index**
    destColumn.splice(destination.index, 0, movedTask);
  
    // ✅ Ensure tasks are updated correctly in state
    setTasks({
      ...newTasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  
    // ✅ Call API with updated task
    updateTodo(movedTask.id, movedTask.todo, movedTask.status);
  };
  
  

  const openModal = (task?: Task) => {
    setEditingTask(task || null);
    setModalOpen(true);    
  };

  const saveTask = async (taskText: string) => {
    if (editingTask) {
        try {
            const updatedTask = await updateTodo(editingTask.id, taskText, editingTask.status);
            setTasks((prev) => ({
              ...prev,
              [editingTask.status]: prev[
                editingTask.status
              ].map((task) => (task.id === updatedTask.id ? updatedTask : task)),
            }));
            
            setToast({ message: "Task updated successfully!", type: "success" });
        } catch (error) {
            console.log(error);  
            setToast({ message: "Failed to update Task", type: "error" });
        }
    } else {
        try {
            const newTask = await addTodo(taskText);
            setTasks((prev) => ({
              ...prev,
              todo: [...prev.todo, newTask],
            }));
            setToast({ message: "Task added successfully!", type: "success" });
        } catch (error) {
            console.log(error);
            setToast({ message: "Failed to add Task", type: "error" });
        }
    }
    setModalOpen(false);
  };

  const handleDelete = async (taskId: number, columnId: string) => {
    try {
        await deleteTodo(taskId);
        setTasks((prev) => ({
          ...prev,
          [columnId]: prev[columnId].filter((task) => task.id !== taskId),
        }));
        setToast({ message: "Task deleted successfully!", type: "success" });
    } catch (error) {
        console.log(error);
        setToast({ message: "Failed to delete Task", type: "error" });
    }
  };

  return (
    <div className="px-4 py-5 flex-1">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <button onClick={() => openModal()} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded ml-auto block">Add New Task</button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={saveTask} initialValue={editingTask?.todo || ""} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {Object.entries(tasks).map(([columnId, items]) => (
            <Column key={columnId} columnId={columnId} tasks={items} onEditTask={openModal} onDeleteTask={handleDelete} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}