import { DevTool } from "@hookform/devtools";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { IPayloadLogin, useLoginUserMutation } from "../../redux/api/user.api";
import { login } from "../../redux/reducers/user.reducer";
import { setCookie } from "../../utils/cookie";
import Button from "../button";
import Input from "../Input/input";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<IProps> = ({ setOpen }) => {
  const [visible, setVisible] = useState<Boolean>(false);

  const [mutate, { isSuccess, error, data, isLoading }] =
    useLoginUserMutation();
  const dispatch = useDispatch();

  const form = useForm<IPayloadLogin>({
    defaultValues: {
      email: "",

      password: "",
    },
  });
  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  if (isSuccess) {
    setCookie("MyToken", data?.accessToken as string);
    setCookie("MyRefreshToken", data?.refreshToken as string);
    dispatch(login());
  }

  const onSubmit = async (body: IPayloadLogin) => {
    await mutate(body);
  };

  const clickChangeVisible = () => {
    setVisible((prev) => !prev);
  };

  const styleVisible =
    "absolute right-[50px] sm:right-[100px] top-[50px] cursor-pointer";

  return (
    <div className="mt-12 w-[230px] sm:w-[400px] md:w-[500px]   mx-[20px]  sm:mx-auto">
      {error && <h1>{JSON.stringify(error)}</h1>}
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
        <form
          className="p-2 w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col mt-2">
            <p className="text-[15px] my-2  text-red-400">
              {errors.email?.message}
            </p>
            <Input
              placeholder={"Enter your  email"}
              {...register("email", {
                required: { value: true, message: "email is required" },
              })}
              label="Email"
              type="email"
            />
          </div>
          <div className="flex flex-col mt-3 relative">
            <p className="text-[15px] my-2  text-red-400">
              {errors.password?.message}
            </p>
            <Input
              id="password"
              placeholder={"Enter your password"}
              {...register("password", {
                required: { value: true, message: "password is required" },
              })}
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
          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};

export default Login;
