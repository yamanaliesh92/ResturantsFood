"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTops = () => {
    if (typeof window === "undefined") return;

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed z-10 right-3 top-[6.6rem]">
      {visible && (
        <div
          onClick={scrollToTops}
          className=" dark:bg-white bg-dark text-white  dark:text-dark rounded-md flex items-center justify-center w-[50px] h-[50px]"
        >
          <AiOutlineArrowUp size={25} />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
