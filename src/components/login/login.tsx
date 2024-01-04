import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { IPayloadLogin, useLoginUserMutation } from "../../redux/api/user.api";
import { login } from "../../redux/reducers/user.reducer";
import { setCookie } from "../../utils/cookie";
import Button from "../button";
import Input from "../Input/input";

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
  const [mutate, { isSuccess, error, data, isLoading }] =
    useLoginUserMutation();
  const dispatch = useDispatch();

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

  const clickChangeVisible = () => {
    setVisible((prev) => !prev);
  };

  const styleVisible =
    "absolute right-[50px] sm:right-[100px] top-[10px] cursor-pointer";

  return (
    <div className="mt-12 w-[230px] sm:w-[400px] md:w-[500px]   mx-[20px]  sm:mx-auto">
      {isLoading && <h1>Loading....</h1>}
      {error && <h1>{JSON.stringify(error)}</h1>}
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
        <form className="p-2 w-full flex flex-col" onSubmit={onSubmit}>
          <div className="flex flex-col mt-2">
            <Input
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              label="Email"
              name="email"
              type="email"
            />
          </div>
          <div className="flex flex-col mt-3 relative">
            <Input
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              name="Password"
              type={visible ? "text" : "password"}
              label="password"
            />
            {visible ? (
              <AiOutlineEye
                className={styleVisible}
                size={20}
                data-testid={"hidePasswordTest"}
                onClick={clickChangeVisible}
              />
            ) : (
              <AiOutlineEyeInvisible
                className={styleVisible}
                size={20}
                data-testid={"showPasswordTest"}
                onClick={clickChangeVisible}
              />
            )}
          </div>

          <Button isLoading={isLoading}> login</Button>
        </form>
        <div className="flex items-center">
          <h1 className="text-gray-700 text-[13px] sm:text-[15px]   mr-4">
            don't have account{" "}
          </h1>
          <h1
            className="text-gray-700 text-[13px]  sm:text-[15px] underline cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            Create a new account
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
