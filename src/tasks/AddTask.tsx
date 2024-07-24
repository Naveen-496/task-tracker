import { useState } from "react";
import Button from "../components/button";
import { IoMdClose } from "react-icons/io";
import TaskForm from "./TaskForm";

const AddTask = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setShowAdd(true)}
        className="bg-blue-500 text-white hover:bg-blue-600 text-center flex items-center justify-center"
      >
        Add Task
      </Button>

      {showAdd && (
        <div
          onClick={() => setShowAdd(false)}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full mx-4 md:mx-0"
          >
            <div className="w-full flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <button
                className="p-2 hover:bg-gray-100 rounded-md transition-all"
                onClick={() => setShowAdd(false)}
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <TaskForm closeForm={() => setShowAdd(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
