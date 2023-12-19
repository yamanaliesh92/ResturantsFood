import React, { useState } from "react";
import { faq } from "../../sataic/faq.data";
import { AiOutlineArrowDown } from "react-icons/ai";

const Faq = () => {
  const [activeTab, setActiveTab] = useState({ id: 0, active: false });

  const clickActiveTab = (id: number) => {
    setActiveTab((prev) => ({ active: !prev.active, id: id }));
  };

  return (
    <div className="w-11/12 mx-auto my-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="mx-auto">
        <div className="border-gray-200 border-b pb-4">
          {faq.map((item) => {
            return (
              <div className="flex justify-between">
                <div className="mb-2"> {item.title}</div>
                <AiOutlineArrowDown onClick={() => clickActiveTab(item.id)} />
                {activeTab.active && activeTab.id === item.id ? (
                  <>{item.response}</>
                ) : null}
              </div>
            );
          })}
          <button className="flex justify-between items-center w-full"></button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
