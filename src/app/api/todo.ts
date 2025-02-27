const API_URL = "https://dummyjson.com/todos";

/** Fetch all todos */
export async function fetchTodos() {
  const response = await fetch(`${API_URL}?limit=10`);
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedTodos = data.todos.map((task: any) => ({
    ...task,
    status: task.completed ? "done" : "todo",
  }));

  return mappedTodos;
}

/** Add a new todo */
export async function addTodo(todoText: string) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: todoText,
      completed: false,
      userId: 1,
    }),
  });

  const data = await response.json();
  const mappedTodos = {
    ...data,
    status: data.completed ? "done" : "todo",
  };

  return mappedTodos;
}

/** Update an existing todo */
export async function updateTodo(id: number, newText: string, status: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: newText,
      completed: status === "done"
    }),
  });

  const data = await response.json();
  return { ...data, status };
}

/** Delete a todo */
export async function deleteTodo(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
}
