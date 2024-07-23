/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";

const TaskForm = ({ closeForm }: { closeForm: () => void }) => {
  const [task, setTask] = useState({ title: "", priority: "", assignee: "" });
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    console.log(setUsers(data.filter((u: any) => u.name !== null)));
    console.log(users);
  }

  const handleSubmit = async (e: FormEvent) => {
    console.log(task);
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };
    const response = await fetch("/api/tasks", options);
    const data = await response.json();
    console.log("Response Data: ", data);
    setTask({ title: "", priority: "", assignee: "" });
    closeForm();
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
            <option value={u.id}>{u.name}</option>
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
          <option className="font-bold" value="low">
            Low
          </option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
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
