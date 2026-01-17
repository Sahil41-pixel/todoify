import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";

const PopModal = ({
  title,
  setTitle,
  description,
  setDescription,
  showModel,
  setShowModel,
  getUserTask,
}) => {
  //handle Close
  const handleClose = () => {
    setShowModel(false);
  };

  //handle Submit
  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { title, description, createdBy };
      if (!title || !description) {
        return toast.error("Please Provide title or description");
      }
      const todo = await TodoServices.createTodo(data);
      setShowModel(false);
      toast.success("Task Created Successfully");
      setTitle("");
      setDescription("");
      getUserTask();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showModel && (
        <div
          /* 🔥 CHANGE 1: Softer dark overlay */
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          tabIndex="-1"
          role="dialog"
        >
          <div className="w-full max-w-lg" role="document">
            {/* 🔥 CHANGE 2: Rounded, warm modal card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">

              {/* HEADER */}
              {/* 🔥 CHANGE 3: Orangish header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100 bg-orange-50">
                <h5 className="text-lg font-semibold text-gray-800">
                  Add New Task
                </h5>
                <button
                  className="text-2xl text-gray-400 hover:text-gray-700 transition"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {/* BODY */}
              <div className="p-6 space-y-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  {/* 🔥 CHANGE 4: Warm focus ring */}
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border rounded-lg outline-none
                    focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  {/* 🔥 CHANGE 5: Matching textarea style */}
                  <textarea
                    placeholder="Add your description"
                    className="w-full px-4 py-2.5 border rounded-lg resize-none outline-none
                    focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>

              {/* FOOTER */}
              {/* 🔥 CHANGE 6: Cleaner footer buttons */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-orange-100 bg-orange-50">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700
                  bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  onClick={handleClose}
                >
                  Close
                </button>

                {/* 🔥 CHANGE 7: Orangish primary action */}
                <button
                  type="button"
                  className="px-5 py-2 text-sm font-medium text-white
                  bg-gradient-to-r from-orange-500 to-amber-500
                  rounded-md hover:from-orange-600 hover:to-amber-600
                  transition shadow-md"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopModal;
