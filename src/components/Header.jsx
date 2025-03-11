import React, { useState } from "react";
import logout from "../assets/icon-logout.svg";
import { useDispatch, useSelector } from "react-redux";
import slices from "../redux/slices";
import { useNavigate } from "react-router-dom";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import "./Header.css";
import AddEditUserModal from "../modals/AddEditUserModal";

function Header() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.slices.user);

  const handleLogout = () => {
    dispatch(slices.actions.logout());
    navigate("/login");
  };
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side  */}
        <div className="flex items-center">
          <h3 className="welcome truncate md:text-xs text-xs font-medium md:ml-2 font-sans">
            Hi, {user?.title} ({user?.role})
          </h3>
        </div>
        {/* Right Side */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className="add-task-btn bg-[#8E1616] py-2 px-4 rounded-full text-white text-lg font-semibold hover:opacity-80 duration-200 me-1"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add Task
          </button>
          <button
            className="bg-[#8E1616] py-2 px-4 rounded-full text-white text-xs font-semibold hover:opacity-80 duration-200 md:hidden me-1"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Task
          </button>
          {user?.role === "admin" && (
            <>
              <button
                className="add-task-btn bg-[#8E1616] py-2 px-4 rounded-full text-white text-lg font-semibold hover:opacity-80 duration-200 me-1"
                onClick={() => {
                  setIsUserModalOpen((prevState) => !prevState);
                }}
              >
                + Add User
              </button>
              <button
                className="bg-[#8E1616] py-2 px-4 rounded-full text-white text-xs font-semibold hover:opacity-80 duration-200 md:hidden me-1"
                onClick={() => {
                  setIsUserModalOpen((prevState) => !prevState);
                }}
              >
                + User
              </button>
            </>
          )}

          <div
            className="mx-2 p-2 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg"
            onClick={() => {
              handleLogout();
            }}
          >
            <img src={logout} alt="logout" />
          </div>
        </div>
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
      {isUserModalOpen && (
        <AddEditUserModal
          setIsAddUserModalOpen={setIsUserModalOpen}
          type="add"
          device="mobile"
        />
      )}
    </div>
  );
}

export default Header;
