import { IoMdClose } from "react-icons/io";
import Button from "../components/button";
import { useState } from "react";
import UserForm from "./UserForm";

const AddUser = () => {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setShowAdd(true)}
        className="bg-purple-500 text-white hover:bg-purple-600"
      >
        Add User
      </Button>

      {showAdd && (
        <div
          onClick={() => setShowAdd(false)}
          className="fixed inset-0 right-0 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white fixed right-0 shadow-lg rounded-lg p-6 max-w-lg w-full  md:mx-0"
          >
            <div className="w-full flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">New User</h2>
              <button
                className="p-2 hover:bg-gray-100 rounded-md transition-all"
                onClick={() => setShowAdd(false)}
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <UserForm closeForm={() => setShowAdd(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
