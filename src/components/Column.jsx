import React, { useEffect, useState } from "react";
import Task from "./Task";
import { useSelector } from "react-redux";

function Column({ colIndex, color }) {
  const allData = useSelector((state) => state.slices.allData);
  const [currentTasks, setCurrentTasks] = useState(allData?.columns);
  useEffect(() => {
    setCurrentTasks(allData?.columns);
  }, [allData?.columns]);
  return (
    <div className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]">
      <div className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {currentTasks[colIndex]?.name} ({currentTasks[colIndex]?.tasks?.length})
      </div>

      {currentTasks[colIndex]?.tasks?.map((task, index) => (
        <Task
          key={index}
          taskIndex={index}
          colIndex={colIndex}
          theTask={task}
        />
      ))}
    </div>
  );
}

export default Column;
