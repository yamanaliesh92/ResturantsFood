import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [restaurantId, setRestaurantId] = useState<number>(0);

  useEffect(() => {
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as any)
      : 0;
    setRestaurantId(id);
  }, []);
  return (
    <div
      className="relative min-h-[70vh] dark:bg-black  w-full bg-no-repeat flex fex-col items-center"
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="w-[90%] mx-auto my-auto 800px:w-[60%]">
        <h1 className="text-[35px] 800px:text-[60px] font-[600] text-[#3d3a3a]">
          Best collection for <br /> Home Decoration
        </h1>
        <p className="p pt-5 text-[400] text-[#0000ba] dark:text-black text-[16px]">
          welcome in restaurant application ,here you can order what you want
        </p>

        {restaurantId !== 0 ? (
          <Link
            to={"/dashboard/products/new"}
            className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer"
          >
            <span className="text-[#fff] flex items-center">Order Now</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Hero;
