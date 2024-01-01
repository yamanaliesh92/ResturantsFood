import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { IPayloadLogin, useLoginUserMutation } from "../../redux/api/user.api";
import { login } from "../../redux/reducers/user.reducer";
import { setCookie } from "../../utils/cookie";

const init: IPayloadLogin = {
  email: "",
  password: "",
};

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<IProps> = ({ setOpen }) => {
  const [visible, setVisible] = useState<Boolean>(false);
  const [value, setValue] = useState<IPayloadLogin>(init);
  const [mutate, { isSuccess, data, isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const changeOpen = () => {
    setOpen((prev) => !prev);
  };

  if (isSuccess) {
    setCookie("MyToken", data?.accessToken as string);
    setCookie("MyRefreshToken", data?.refreshToken as string);
    dispatch(login({ email: value.email }));
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IPayloadLogin = {
      email: value.email,
      password: value.password,
    };
    await mutate(body);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clickChangeVisible = () => {
    setVisible((prev) => !prev);
  };

  const styleVisible = "absolute right-2 top-[17px] cursor-pointer";
  const styleInput =
    "appearance-none w-full block relative  px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="mt-12 w-[230px] sm:w-[400px] md:w-[500px]  mx-[20px]  sm:mx-auto">
      {isLoading && <h1>Loading....</h1>}
      <h2 className="text-center text-3xl text-gray-900 font-extrabold">
        Login
      </h2>
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
        <form className="spec-y-6" onSubmit={onSubmit}>
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
                data-testid={"emailTest"}
                value={value.email}
                onChange={onChange}
                autoComplete={"gamil"}
                name="email"
                type={"email"}
                className={styleInput}
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
                data-testid={"passwordTest"}
                value={value.password}
                onChange={onChange}
                name="password"
                type={visible ? "text" : "password"}
                className={styleInput}
              />
              {visible ? (
                <AiOutlineEye
                  className={styleVisible}
                  size={25}
                  data-testid={"hidePasswordTest"}
                  onClick={clickChangeVisible}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={styleVisible}
                  size={25}
                  data-testid={"showPasswordTest"}
                  onClick={clickChangeVisible}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 ">
            <div className="text-sm">
              <h1 className="font-medium cursor-pointer text-blue-600 hover:text-blue-500">
                Forget Your Password?
              </h1>
            </div>
          </div>

          <div className="mt-4">
            <button
              data-testid={"submitTest"}
              className="group w-full h-[40px] py-2 px-4 flex justify-center border border-transparent font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700"
              type={"submit"}
            >
              Login
            </button>
          </div>

          <div className="flex items-center mt-4">
            <h4>create a new account?</h4>
            <h1
              onClick={changeOpen}
              className="text-blue-600 cursor-pointer pl-2"
            >
              Sign Up
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
