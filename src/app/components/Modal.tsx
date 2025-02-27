"use client";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskText: string) => void;
  initialValue?: string;
}

export default function Modal({ isOpen, onClose, onSave, initialValue }: ModalProps) {
  const [taskText, setTaskText] = useState(initialValue || "");

  useEffect(() => {
    if (initialValue) {
        setTaskText(initialValue);
    }
  }, [initialValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{initialValue ? "Edit Task" : "Add Task"}</h2>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter task..."
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button
            onClick={() => {
              onSave(taskText);
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}