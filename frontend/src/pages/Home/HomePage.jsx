import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import PopModal from "../../components/PopModal";
import TodoServices from "../../Services/TodoServices";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner";

const HomePage = () => {
  const [showModel, setShowModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  const openModelHandler = () => {
    setShowModel(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    let filterlist = allTask?.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase())
    );
    setSearchQuery(query);

    if (query && filterlist.length > 0) {
      setAllTask(filterlist);
    } else {
      getUserTask();
    }
  };

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

  return (
    <>
      <Navbar />

      {/* 🔥 CHANGE 1: Orangish gradient background */}
      <div className="fixed inset-0 pt-16  bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 ">

        {/* 🔥 CHANGE 2: Soft orange glow blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl" />

        {/* 🔥 CHANGE 3: Make content relative so glow stays behind */}
        <div className="relative max-w-7xl mx-auto px-4 py-6">

          {/* ===== HEADER SECTION ===== */}
          {/* 🔥 CHANGE 4: Warm glass card */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between
            bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-lg border border-orange-100">
            
            <h1 className="text-xl font-bold text-gray-800">
              Your Tasks
            </h1>

            <input
              className="w-full lg:w-[420px] rounded-lg border border-gray-300 px-4 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="search"
              placeholder="🔍 Search your task"
              value={searchQuery}
              onChange={handleSearch}
            />

            {/* 🔥 CHANGE 5: Orangish gradient button */}
            <button
              className="flex items-center justify-center gap-2 px-6 py-2.5
              bg-gradient-to-r from-orange-500 to-amber-500
              text-white font-semibold rounded-lg
              hover:from-orange-600 hover:to-amber-600
              transition-all duration-300
              shadow-md hover:shadow-xl"
              onClick={openModelHandler}
            >
              Create Task
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {/* ===== CONTENT ===== */}
          <div className="mt-8 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
            {loading ? (
              <Spinner />
            ) : (
              allTask && (
                <Card allTask={allTask} getUserTask={getUserTask} />
              )
            )}
          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      <PopModal
        showModel={showModel}
        setShowModel={setShowModel}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        getUserTask={getUserTask}
      />
    </>
  );
};

export default HomePage;
