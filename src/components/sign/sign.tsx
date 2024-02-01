import React, { FC, useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useDispatch } from "react-redux";
import {
  IPayloadRegister,
  useCreateUserMutation,
} from "../../redux/api/user.api";
import { login } from "../../redux/reducers/user.reducer";
import { setCookie } from "../../utils/cookie";
import Button from "../button";
import Input from "../Input/input";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { SerializedError } from "@reduxjs/toolkit";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Username cannot be an empty string",
      }),

    password: z.string().min(2).max(20),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const [mutate, { isSuccess, data, error, isLoading }] =
    useCreateUserMutation();
  const dispatch = useDispatch();

  const changeOpen = () => {
    setOpen((prev) => !prev);
  };

  if (isSuccess) {
    setCookie("MyToken", data?.accessToken as string);
    setCookie("MyRefreshToken", data?.refreshToken as string);
    dispatch(login());
  }

  const clickChangeVisible = () => {
    setVisible((prev) => !prev);
  };

  const onSubmit = async (body: Schema) => {
    await mutate(body);
  };

  return (
    <div className="mt-10 w-[230px] sm:w-[400px] md:w-[500px]  mx-[20px]  sm:mx-auto   ">
      <h2 className="mt-3 mb-1 text-white dark:text-blue-900 text-center text-3xl t  font-extrabold">
        Welcome in food app
      </h2>

      <div className="bg-white py-8 px-4 s sm:rounded-lg sm:px-10">
        <form
          className="p-2 w-full  flex-col"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {error && (
            <h1 className="error"> {(error as SerializedError).message}</h1>
          )}

          <div className="flex flex-col items-start mt-2 relative">
            <p className="error">{errors.email?.message}</p>

            <Input
              placeholder={"Enter your  email"}
              {...register("email")}
              label="Email"
              type="email"
            />
          </div>
          <div className="flex flex-col mt-3 relative">
            <p className="error">{errors.password?.message}</p>
            <Input
              id="password"
              placeholder={"Enter your password"}
              {...register("password")}
              type={visible ? "text" : "password"}
              label="Password"
            />
            {visible ? (
              <AiOutlineEye
                className="styleVisible"
                size={25}
                data-testid={"hidePasswordTest"}
                onClick={clickChangeVisible}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="styleVisible"
                size={25}
                data-testid={"showPasswordTest"}
                onClick={clickChangeVisible}
              />
            )}
          </div>
          <div className="flex flex-col my-3 relative">
            <p className="error">{errors.username?.message}</p>
            <Input
              placeholder={"Enter your name"}
              {...register("username")}
              type="text"
              label="username"
            />
          </div>

          <Button isLoading={isLoading}>sign up</Button>
        </form>
        <div className=" block  sm:flex items-center">
          <h4>Do you have an account </h4>
          <h1
            onClick={changeOpen}
            className="text-secondly underline cursor-pointer pl-2"
          >
            Sign In
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sign;
