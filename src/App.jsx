import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTasks";
import { v4 } from "uuid";
import Title from "./components/Title";
import { GithubIcon } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    //async function fetchData() {
    //chamar api
    // const response = await fetch(
    //   "https://jsonplaceholder.typicode.com/todos?_limit=10",
    //   {
    //     method: "GET",
    //    }
    //  );
    //pegar os dados dela
    //  const data = await response.json();
    //armazenar no estado
    //  setTasks(data);
    //}
    //chamar a função de api
    //fetchData();
  }, []);
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //preciso atualizar
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      //não preciso atualizar
      return task;
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Task manager</Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
        <p className="flex text-slate-300">
          @caduoliveira01
          <GithubIcon />
        </p>
      </div>
    </div>
  );
}

export default App;
