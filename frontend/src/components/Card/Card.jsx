import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const Card = ({ allTask, getUserTask }) => {
  const [showModel, setShowModel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task Deleted Successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-start">
        {allTask?.map((task) => (
          <div
            key={task._id}
            className="w-72 mt-3 border border-blue-500 rounded-lg shadow-sm bg-white"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-blue-500">
              <h6 className="font-semibold text-sm">
                {task?.title.substring(0, 10)}
              </h6>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  task?.isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {task?.isCompleted ? "Completed" : "Incomplete"}
              </span>
            </div>

            {/* BODY */}
            <div className="p-4 space-y-2">
              <h6 className="font-bold text-gray-800">{task?.title}</h6>
              <p className="text-sm text-gray-600">{task?.description}</p>
              <h6 className="text-xs text-gray-500">
                Date : {task?.createdAt?.substring(0, 10)}
              </h6>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-2 px-4 py-2 border-t border-blue-500">
              <button
                title="Edit Task"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTask(task);   // 👈 correct task
                  setShowModel(true);      // 👈 open modal
                }}
                className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>

              <button
                title="Delete Task"
                onClick={() => handleDelete(task._id)}
                className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ SINGLE MODAL (IMPORTANT) */}
      {showModel && selectedTask && (
        <EditTodo
          task={selectedTask}
          setShowModel={setShowModel}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;
