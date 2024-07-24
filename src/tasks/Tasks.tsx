import { useEffect } from "react";
import Button from "../components/button";
import AddTask from "./AddTask";
import AddUser from "../users/AddUser";
import { deleteTask, fetchTasks } from "./tasks-slice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { BsTrashFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { Task } from "../types";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const onDeleteTask = async (id: number) => {
    const response = await fetch("/api/tasks/" + id, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deleteTask(id));
    }
  };

  const onChangeStatus = async (task: Task) => {
    const updatedTask = { ...task, isDone: !task.isDone };
    const response = await fetch("/api/tasks/toggle", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    console.log(data);
    dispatch(fetchTasks());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
          <div className="flex gap-4">
            <AddTask />
            <AddUser />
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 border-b">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 ">Status</th>
                <th className="px-6 py-3 ">ID</th>
                <th className="px-6 py-3 ">Name</th>
                <th className="px-6 py-3 ">Assignee</th>
                <th className="px-6 py-3 ">Priority</th>
                <th className="px-6 py-3 ">Created</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.taskId} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input
                      className="ml-2 w-4 h-4"
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => onChangeStatus(task)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.taskId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="w-full flex items-center gap-2">
                      <div
                        className={`rounded-full w-7 h-7 text-center flex items-center justify-center font-bold text-white bg-green-500
                        `}
                      >
                        <p> {task.assigneeName[0]}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold"> {task.assigneeName}</h3>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(task.createdDate).toDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-4 items-center">
                    <Button
                      title="Edit"
                      onClick={() => onDeleteTask(task.taskId)}
                      className="bg-orange-500 text-white hover:bg-orange-600 px-2.5"
                    >
                      <GrEdit size={18} color="white" />
                    </Button>
                    <Button
                      title="Delete"
                      onClick={() => onDeleteTask(task.taskId)}
                      className="bg-red-500 text-white hover:bg-red-600 px-2.5"
                    >
                      <BsTrashFill size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function PriorityBadge({ priority }: { priority: string }) {
  switch (priority) {
    case "HIGH": {
      return <div className="text-red-600 font-bold text-md">{priority}</div>;
    }
    case "MEDIUM": {
      return (
        <div className="text-orange-400 font-bold text-md">{priority}</div>
      );
    }
    default: {
      return (
        <div className="text-yellow-400 font-bold text-md">{priority}</div>
      );
    }
  }
}

export default Tasks;
