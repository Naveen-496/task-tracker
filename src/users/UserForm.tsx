import { FormEvent, useRef, useState } from "react";
import Button from "../components/button";

const UserForm = ({ closeForm }: { closeForm: () => void }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user.name || !user.email || !file) return;

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("avatarImage", file);

    try {
      const response = await fetch("/api/users/with-profile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Response Data: ", data);
      setUser({ name: "", email: "" });
      setFile(undefined);
      closeForm();
    } catch (error) {
      console.error("Error saving user: ", error);
    }
  };
  const onClickFile = () => {
    if (fileRef) {
      fileRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form>
      <div
        onClick={onClickFile}
        className="mb-4 w-[100px] h-[100px] bg-green-200 rounded-full m-auto flex items-center justify-center cursor-pointer overflow-hidden"
      >
        <input
          onChange={handleFileChange}
          className="hidden"
          type="file"
          ref={fileRef}
        />
        {file && imageUrl ? (
          <img
            src={imageUrl}
            alt="Selected file"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Upload</span>
        )}
      </div>

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
          htmlFor="email"
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
