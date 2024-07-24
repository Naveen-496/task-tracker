/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./tasks-slice";
import { AppDispatch } from "../store";
import { User } from "../types";

const TaskForm = ({ closeForm }: { closeForm: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [users, setUsers] = useState<User[]>([]);
  const [task, setTask] = useState({ title: "", priority: "", assigneeId: "" });

  async function fetchUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    console.log(setUsers(data.filter((u: any) => u.name !== null)));
    console.log(users);
  }

  const handleSubmit = async (e: FormEvent) => {
    if (!task.assigneeId) {
      task.assigneeId = String(users[0].id);
    }
    if (!task.priority) {
      task.priority = "LOW";
    }
    console.log(task);
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task,
        createdDate: new Date(),
        assigneeId: Number(task.assigneeId),
      }),
    };
    const response = await fetch("/api/tasks", options);
    const data = await response.json();
    console.log("Response Data: ", data);
    setTask({ title: "", priority: "", assigneeId: "" });
    closeForm();
    dispatch(fetchTasks());
  };

  const handleFieldsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <form>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Task Title"
          onChange={handleFieldsChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="assignee"
          className="block text-sm font-medium text-gray-700"
        >
          Assignee
        </label>
        <select
          className="w-full p-2 border rounded-md"
          id="assignee"
          name="assignee"
          onChange={handleFieldsChange}
        >
          {users.map((u: any) => (
            <option key={u.name} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
          Priority
        </label>
        <select
          className="w-full p-2 border rounded-md"
          id="priority"
          name="priority"
          onChange={handleFieldsChange}
        >
          <option className="font-bold" value="LOW">
            Low
          </option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
