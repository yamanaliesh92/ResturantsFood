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
      className="relative min-h-[70vh] bg-white  dark:bg-blue-950  w-full bg-no-repeat flex fex-col items-center"
      // style={{
      //   backgroundImage:
      //     "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      // }}
    >
      <div className="w-[90%] mx-auto my-auto 800px:w-[60%]">
        <h1 className="text-[35px]  font-[600] text-blue-950 dark:text-white ">
          Best collection for <br /> Home Decoration
        </h1>
        <p className="pt-5 text-[400] text-blue-950 dark:text-white  text-[16px]">
          Welcome in restaurant application ,here you can order what you want
        </p>

        {restaurantId !== 0 ? (
          <Link
            to={"/dashboard/products/new"}
            className="w-[150px] bg-blue-950 dark:bg-white  h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer"
          >
            <span className="dark:text-blue-950 text-white flex items-center">
              Order Now
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Hero;
