import React, { useState } from "react";
import Header from "./Header";
import Content from "./Content";

const HomePage = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Header Section */}
      <Header
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
      />
      {/* Content Section */}
      <Content />
    </div>
  );
};

export default HomePage;
