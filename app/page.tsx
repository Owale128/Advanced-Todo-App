import TodoApp from "./components/TodoApp";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-12">
        <TodoApp />
      </div>
    </main>
  );
}
