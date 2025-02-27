import KanbanBoard from "./components/KanbanBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center bg-gray-100 p-4 w-full">
      <KanbanBoard />
    </main>
  );
}
