import { FormEvent, useState } from "react";
import Button from "../components/button";

const UserForm = ({ closeForm }: { closeForm: () => void }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  const handleSubmit = async (e: FormEvent) => {
    console.log(user);
    e.preventDefault();
    if (!user.name || !user.email) return;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/api/users", options);
    const data = await response.json();
    console.log("Response Data: ", data);
    setUser({ name: "", email: "" });
    closeForm();
  };

  return (
    <form>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter name"
          onChange={({ target }) =>
            setUser((prev) => ({ ...prev, name: target.value }))
          }
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="assignee"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={user.email}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter email"
          onChange={({ target }) =>
            setUser((prev) => ({ ...prev, email: target.value }))
          }
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
