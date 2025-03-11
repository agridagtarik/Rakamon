import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ElipsisMenu from "../components/ElipsisMenu";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import slices from "../redux/slices";
import Personel from "../components/Personel";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen, theTask }) {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const allData = useSelector((state) => state.auth.allData);
  // const [selectedTask, setSelectedTask] = useState();

  // useEffect(() => {
  //   const col = allData?.columns?.find((col, i) => i === colIndex);
  //   const task = col?.tasks?.find((task, i) => i === taskIndex);
  //   setSelectedTask(task);
  // }, [allData?.columns, colIndex, taskIndex]);

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(slices.actions.deleteTask({ taskIndex, colIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className=" fixed right-0 top-0 px-2 py-4 overflow-scroll z-50 left-0 bottom-0 justify-center items-center flex dropdown "
    >
      {/* MODAL SECTION */}

      <div className="max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{theTask.title}</h1>

          <img
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6 break-words">
          {theTask.description}
        </p>

        <p className="pt-6 text-gray-500 tracking-widest text-sm break-words">
          Assigned Personel
        </p>

        {/* Personel Section */}

        <div className=" mt-3 space-y-2">
          <Personel
            index={0}
            taskIndex={taskIndex}
            colIndex={colIndex}
            key={0}
          />
        </div>

        {/* Current Status Section */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm focus:border-0 border-[1px] border-gray-300 focus:outline-[#8E1616] outline-none bg-[#b3b5c4]"
            value={theTask.status}
            disabled
          >
            <option className="status-options">{theTask.status}</option>
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={theTask.title}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
