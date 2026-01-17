import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import TodoServices from "../../Services/TodoServices";
import Spinner from "../../components/Spinner";

const TodoList = () => {
  const [todoStatus, setTodoStatus] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);

  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData.user.id;

  const getUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos);
      sessionStorage.setItem("todos", JSON.stringify(data?.todos));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
  const cachedTasks = sessionStorage.getItem("todos");

  if (cachedTasks) {
    setAllTask(JSON.parse(cachedTasks));
  } else {
    getUserTask();
  }
}, []);

  // useEffect(() => {
  //   getUserTask();
  // }, []);

  useEffect(() => {
    const incomplete = allTask?.filter((item) => item.isCompleted === false);
    const completed = allTask?.filter((item) => item.isCompleted === true);

    if (todoStatus === "incomplete") {
      setFilteredTask(incomplete);
    } else if (todoStatus === "completed") {
      setFilteredTask(completed);
    } else {
      setFilteredTask(allTask);
    }
  }, [todoStatus, allTask]);

  return (
    <>
      <Navbar />

      {/* 🔥 CHANGE 1: Orangish gradient background */}
      <div className="fixed inset-0 pt-16 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">

        {/* 🔥 CHANGE 2: Soft orange glow blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl" />

        {/* 🔥 CHANGE 3: Content wrapper made relative */}
        <div className="relative">

          {/* ================= FILTER BAR ================= */}
          {/* 🔥 CHANGE 4: Glassy, warm filter bar */}
          <div className="max-w-6xl mx-auto mt-6 px-4">
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-orange-100">
              <h4 className="font-semibold text-gray-700">
                Filter Todos
              </h4>

              <select
                className="ml-auto rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700
                focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={(e) => setTodoStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="incomplete">Incomplete</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* ================= LOADING ================= */}
          {loading && <Spinner />}

          {/* ================= TODO LIST ================= */}
          <div className="max-w-6xl mx-auto px-4 mt-8 pb-16 max-h-[calc(100vh-260px)] overflow-y-auto pr-2">
            {filteredTask?.length === 0 ? (
              <div className="text-center py-20">
                <h1 className="text-lg font-semibold text-orange-600">
                  No task found
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredTask?.map((task, i) => (
                  <div
                    key={i}
                    /* 🔥 CHANGE 5: Warm card style + smooth hover */
                    className="rounded-xl border border-orange-100 bg-white/90 backdrop-blur
                    shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-orange-100">
                      <h6 className="font-semibold text-sm text-gray-800">
                        {task?.title.substring(0, 10)}
                      </h6>

                      {/* 🔥 CHANGE 6: Orangish status pills */}
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          task?.isCompleted
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {task?.isCompleted ? "Completed" : "Incomplete"}
                      </span>
                    </div>

                    {/* CARD BODY */}
                    <div className="p-4 space-y-2">
                      <h6 className="font-bold text-gray-900">
                        {task?.title}
                      </h6>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {task?.description}
                      </p>

                      <p className="text-xs text-gray-400 pt-2">
                        📅 {task?.createdAt?.substring(0, 10)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default TodoList;
