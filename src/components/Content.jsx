import React, { useEffect, useState } from "react";
import Column from "./Column";
import { useSelector } from "react-redux";

function Content() {
  const colors = ["bg-yellow-500", "bg-red-500", "bg-blue-500", "bg-green-500"];
  const [columns, setColumns] = useState([]);
  const allData = useSelector((state) => state.slices.allData);
  useEffect(() => {
    setColumns(allData?.columns);
  }, [allData?.columns]);

  return (
    <div className="bg-[#f4f7fd] overflow-x-scroll h-screen flex flex-wrap justify-around dark:bg-[#20212c] pt-3">
      {columns?.map((col, index) => (
        <Column key={index} colIndex={index} color={colors[index]} />
      ))}
    </div>
  );
}

export default Content;
