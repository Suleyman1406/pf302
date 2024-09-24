import { Counter } from "./components/counter";

function App() {
  return (
    <div className="max-w-[400px] my-20 mx-auto flex flex-col gap-4">
      <h1 className="text-black text-2xl font-bold">
        Hello, welcome to our Counter App!
      </h1>
      <Counter />
    </div>
  );
}

export default App;
