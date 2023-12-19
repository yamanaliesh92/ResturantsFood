import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// shopName,zipCode,email ,password,phoneNumber,address,descirbation,imgOfProduct

const ShopCreate = () => {
  const [visible, setVisible] = useState<Boolean>(false);

  const clickChangeVisible = () => {
    setVisible((prev) => !prev);
  };
  const styleVisible = "absolute right-2 top-[17px] cursor-pointer";
  const dd =
    "appearance-none w-full block relative  px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="min-h-screen bg-white-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* <div className="sm:m-auto sm:w-full sm:max-w-md"> */}
      <h2 className="mt-6 text-center text-3xl text-gray-900 font-extrabold">
        Register as a seller
      </h2>
      {/* </div> */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white py-8 px-4 shadow-sm:rounded-lg sm:px-10">
          <form className="spec-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-medium"
              >
                Email addres
              </label>
              <div className="mt-1">
                <input
                  required
                  autoComplete={"gamil"}
                  name="email"
                  type={"email"}
                  className={dd}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 font-medium"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  required
                  name="password"
                  type={visible ? "text" : "password"}
                  className={dd}
                />
                {visible ? (
                  <AiOutlineEye
                    className={styleVisible}
                    size={25}
                    onClick={clickChangeVisible}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={styleVisible}
                    size={25}
                    onClick={clickChangeVisible}
                  />
                )}
              </div>
            </div>

            <div className="f flex items-center justify-between mt-4 ">
              <div className="ff flex items-center">
                <input
                  type={"checkbox"}
                  name="rember-me"
                  id="remeber-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  className="ml-2 block text-gray-900"
                  htmlFor="remeber-me"
                >
                  Rember me
                </label>
              </div>
              <div className="text-sm">
                <h1 className="ff font-medium cursor-pointer text-blue-600 hover:text-blue-500">
                  Forget Your Password?
                </h1>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="group w-full h-[40px] py-2 px-4 flex justify-center border border-transparent font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700"
                type={"submit"}
              >
                submit
              </button>
            </div>

            <div className="flex items-center mt-4">
              <h4>Not have any account?</h4>
              <h1 className="text-blue-600 cursor-pointer pl-2">Sign Up</h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
