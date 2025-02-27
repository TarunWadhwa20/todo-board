# Trello-Style ToDo Board

This project is a **Trello-style ToDo board** built with **Next.js, TypeScript, and Tailwind CSS**. It allows users to manage their tasks by dragging and dropping them between different columns (To Do, Pending, In Progress, Done). The tasks are fetched from an API and CRUD operations (Create, Read, Update, Delete) are implemented.

## 🚀 Features
- **Drag-and-drop functionality** using `@hello-pangea/dnd`
- **CRUD operations** with `https://dummyjson.com/todos`
- **Local state management** with `useState`
- **Persistent storage** using `localStorage`
- **Modal component** for adding/editing tasks
- **Toast messages** for success/error notifications
- **Dark mode support** (optional, can be disabled)

## 🛠 Tech Stack
- **Next.js (TypeScript)** - Framework for React applications
- **Tailwind CSS** - Styling
- **@hello-pangea/dnd** - Drag-and-drop functionality
- **React Hooks** - `useState`, `useEffect`
- **dummyjson.com API** - Fake data API for todos

## 📂 Folder Structure
```
📦 trello-board
├── 📂 components
│   ├── Column.tsx          # Single column component
│   ├── Task.tsx            # Task item component
│   ├── Modal.tsx           # Modal for adding/editing tasks
│   ├── Toast.tsx           # Toast message component
├── 📂 pages
│   ├── page.tsx            # Main ToDo board page
├── 📂 utils
│   ├── api.ts              # API functions for CRUD operations
├── 📂 styles
│   ├── globals.css         # Global styles
├── 📜 README.md            # Project documentation
├── 📜 package.json         # Dependencies and scripts
```

## 📌 Setup & Installation
### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/trello-board.git
cd trello-board
```

### 2️⃣ Install dependencies
```bash
yarn install
# or
npm install
```

### 3️⃣ Run the development server
```bash
yarn dev
# or
npm run dev
```
🔗 Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📌 How It Works
1. **Drag tasks** between columns (To Do, Pending, In Progress, Done).
2. **Click the "Add Task" button** to open the modal and create a new task.
3. **Click a task** to edit it using the same modal.
4. **Delete a task** using the delete button inside the task.
5. **Changes persist** even after a page refresh (using localStorage).

## ⚙️ API Endpoints Used
We use `https://dummyjson.com/todos` for fetching and updating tasks.
- **GET** `/todos` → Fetch tasks
- **POST** `/todos/add` → Add a new task
- **PUT** `/todos/{id}` → Update a task
- **DELETE** `/todos/{id}` → Remove a task

## 🐛 Troubleshooting
### Duplicate key error when moving tasks?
Ensure that **each task has a unique `id`** when rendering:
```tsx
<Draggable key={task.id} draggableId={task.id.toString()} index={index}>
```
### Dragging doesn't work properly?
Ensure the correct structure for `handleDragEnd` and that tasks are properly removed before inserting into another column.

## 📜 License
This project is licensed under the **MIT License**.

## ✨ Contributions
Feel free to open issues or submit pull requests to improve the project!

---
📌 **GitHub Repository:** https://github.com/tarunwadhwa20/trello-board