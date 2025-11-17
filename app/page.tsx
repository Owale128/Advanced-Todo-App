import TodoApp from "./components/TodoApp";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-screen text-3xl font-bold">
      <h1>Advanced Todo App</h1>
      <TodoApp />
    </main>
  );
}
