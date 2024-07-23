import { useState } from "react";
import Button from "../components/button";
import AddTask from "./AddTask";
import AddUser from "../users/AddUser";

const initialTasks = [
  {
    id: 1,
    title: "Handle Header",
    priority: "HIGH",
    assignee: "Naveen",
    created: new Date(2024, 7, 10),
  },
  {
    id: 2,
    title: "Remove Button",
    priority: "MEDIUM",
    assignee: "Guru",
    created: new Date(2024, 7, 12),
  },
  {
    id: 3, // Changed ID to be unique
    title: "Add Tailwind",
    priority: "LOW",
    assignee: "Sachin",
    created: new Date(2024, 7, 20),
  },
];

type Tasks = typeof initialTasks;

const Tasks = () => {
  const [tasks] = useState<Tasks>([...initialTasks]);

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
                <tr key={task.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.assignee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.priority}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.created.toDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button className="bg-red-500 text-white hover:bg-red-600">
                      Delete
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

export default Tasks;
