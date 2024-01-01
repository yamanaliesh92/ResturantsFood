import React, { ChangeEvent, FC, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiPhotograph } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  IPayloadRegister,
  useCreateUserMutation,
} from "../../redux/api/user.api";
import { login } from "../../redux/reducers/user.reducer";
import { setCookie } from "../../utils/cookie";

const init = {
  email: "",
  password: "",
  username: "",
};

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IError {
  message: string;
  statusCode: number;
}

const Sign: FC<IProps> = ({ setOpen }) => {
  const [visible, setVisible] = useState<Boolean>(false);
  const [value, setValue] = useState(init);
  const [img, setImg] = useState<File | null>(null);
  const [mutate, { isSuccess, data, error, isLoading }] =
    useCreateUserMutation();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const changeOpen = () => {
    setOpen((prev) => !prev);
  };

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const value = e.target.files[0];
    setImg(value);
  };

  if (isSuccess) {
    setCookie("MyToken", data?.accessToken as string);
    setCookie("MyRefreshToken", data?.refreshToken as string);
    dispatch(login({ email: value.email }));
  }

  console.log("error", error);
  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof IPayloadRegister
  ) => {
    const value = e.target.value;
    setValue((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const clickChangeVisible = () => {
    setVisible((prev) => !prev);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!img) return alert("please click in icon Gallery  img is required");
    const formDate = new FormData();
    formDate.append("img", img);
    formDate.append("email", value.email);
    formDate.append("password", value.password);
    formDate.append("username", value.username);

    await mutate(formDate as any);
  };

  const styleVisible = "absolute right-2 top-[17px] cursor-pointer";
  const styleInput =
    "appearance-none w-full block relative  px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="mt-10 w-[230px] sm:w-[400px] md:w-[500px]  mx-[20px]  sm:mx-auto   ">
      <h2 className="mt-3 text-center text-3xl text-gray-900 font-extrabold">
        create a new account
      </h2>

      <div className="bg-white py-8 px-4 s sm:rounded-lg sm:px-10">
        <form className="spec-y-6" onSubmit={onSubmit}>
          {isLoading && <h1>Loading ....</h1>}
          {error && (
            <h1 className="text-center text-[14px] text-red-400 my-2">
              {JSON.stringify(error)}
            </h1>
          )}

          <div className="my-2">
            <label
              data-testid="labelEmail"
              className="block text-sm text-gray-700 font-medium"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                required
                data-testid={"emailTest"}
                value={value.email}
                autoComplete={"gamil"}
                name="email"
                onChange={(e) => onChange(e, "email")}
                type={"email"}
                className={styleInput}
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              data-testid={"labelPassword"}
              className="block text-sm text-gray-700 font-medium"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                required
                data-testid={"passwordTest"}
                name="password"
                value={value.password}
                type={visible ? "text" : "password"}
                className={styleInput}
                onChange={(e) => onChange(e, "password")}
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

          <div className="my-2">
            <label
              data-testid={"usernameLabel"}
              className="block text-sm text-gray-700 font-medium"
            >
              User Name
            </label>
            <div className="mt-1">
              <input
                required
                data-testid={"usernameTest"}
                value={value.username}
                name="username"
                type={"text"}
                className={styleInput}
                onChange={(e) => onChange(e, "username")}
              />
            </div>
          </div>

          <div className="hidden">
            <input
              // required
              data-testid={"imgTest"}
              ref={inputRef}
              name="img"
              type={"file"}
              className={styleInput}
              onChange={onChangeImg}
            />
          </div>

          <div
            className="mt-4 flex items-center  cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <HiPhotograph size={25} />
            <h4 className="ml-4">photo</h4>
          </div>

          <div className="mt-4">
            <button
              className="bg- bg-gray-500 text-white p-4 rounded-md"
              data-testid={"submitTest"}
            >
              submit
            </button>
          </div>
        </form>
        <div className=" block  sm:flex items-center mt-4">
          <h4>Do you have an account </h4>
          <h1
            onClick={changeOpen}
            className="text-blue-600 cursor-pointer pl-2"
          >
            Sign In
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sign;
