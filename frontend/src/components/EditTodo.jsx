import React, { useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";

const EditTodo = ({ task, setShowModel, getUserTask }) => {
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted);

  const handleClose = () => {
    setShowModel(false);
  };

  const handleSelectChange = (e) => {
    setIsCompleted(e.target.value === "true");
  };

  const handleSubmit = async () => {
    try {
      if (!title || !description) {
        return toast.error("Please provide title and description");
      }

      const userData = JSON.parse(localStorage.getItem("todoapp") || "{}");
      const createdBy = userData?.user?.id;

      const data = { title, description, createdBy, isCompleted };

      await TodoServices.updateTodo(task._id, data);

      toast.success("Task Updated Successfully");
      setShowModel(false);
      getUserTask();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  return (
    <>
      {/* 🔥 CHANGE 1: Softer overlay + blur */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

        <div className="w-full max-w-lg">
          {/* 🔥 CHANGE 2: Rounded, warm modal */}
          <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">

            {/* HEADER */}
            {/* 🔥 CHANGE 3: Orangish header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100 bg-orange-50">
              <h5 className="text-lg font-semibold text-gray-800">
                Update Your Task
              </h5>
              <button
                className="text-2xl text-gray-400 hover:text-gray-700 transition"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                {/* 🔥 CHANGE 4: Orange focus ring */}
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border rounded-lg outline-none
                  focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                {/* 🔥 CHANGE 5: Matching textarea style */}
                <textarea
                  className="w-full px-4 py-2.5 border rounded-lg resize-none outline-none
                  focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                {/* 🔥 CHANGE 6: Warm select input */}
                <select
                  className="w-full px-4 py-2.5 border rounded-lg bg-white outline-none
                  focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  value={String(isCompleted)}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Status</option>
                  <option value="true">Completed</option>
                  <option value="false">Incomplete</option>
                </select>
              </div>
            </div>

            {/* FOOTER */}
            {/* 🔥 CHANGE 7: Clean footer + orangish CTA */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-orange-100 bg-orange-50">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700
                bg-gray-200 rounded-md hover:bg-gray-300 transition"
                onClick={handleClose}
              >
                Close
              </button>

              <button
                className="px-5 py-2 text-sm font-medium text-white
                bg-gradient-to-r from-orange-500 to-amber-500
                rounded-md hover:from-orange-600 hover:to-amber-600
                transition shadow-md"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;

