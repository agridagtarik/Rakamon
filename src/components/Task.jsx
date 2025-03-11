import React, { useState } from "react";

import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex, theTask }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // const allData = useSelector((state) => state.slices.allData);

  // const [selectedTask, setSelectedTask] = useState(
  //   allData?.colums[colIndex]?.tasks[taskIndex]
  // );

  // useEffect(() => {
  //   setSelectedTask(allData?.colums[colIndex]?.tasks[taskIndex]);
  // }, [allData?.colums, colIndex, taskIndex]);

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        className=" w-[280px] first:my-5 rounded-lg bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#8E1616] dark:text-white dark:hover:text-[#8E1616] cursor-pointer "
      >
        <div className="flex justify-between">
          <p className="font-bold tracking-wide break-words">
            {theTask?.title}
          </p>
        </div>

        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500 break-words">
          <strong className="underline decoration-black-500">
            Personel assigned:{" "}
          </strong>
          {theTask?.personel?.title || "N/A"}
        </p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500 break-words">
          <strong className="underline decoration-black-500">
            Description:{" "}
          </strong>
          {theTask?.description || "N/A"}
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
          theTask={theTask}
        />
      )}
    </div>
  );
}

export default Task;
