import { SerializedError } from "@reduxjs/toolkit";
import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../redux/api/user.api";
import { login } from "../../redux/reducers/user.reducer";
import { setCookie } from "../../utils/cookie";
import Button from "../button";
import Input from "../Input/input";
import { z } from "zod";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<IProps> = ({ setOpen }) => {
  const [visible, setVisible] = useState<Boolean>(false);

  const [mutate, { isSuccess, error, data, isLoading }] =
    useLoginUserMutation();
  const dispatch = useDispatch();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),

    password: z.string().min(2).max(20),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  if (isSuccess) {
    setCookie("MyToken", data?.accessToken as string);
    setCookie("MyRefreshToken", data?.refreshToken as string);
    dispatch(login());
  }

  const onSubmit = async (body: Schema) => {
    await mutate(body);
  };

  const clickChangeVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="mt-12 w-[230px] sm:w-[400px] md:w-[500px]   mx-[20px]  sm:mx-auto">
      {error && (
        <h1 className="error"> {(error as SerializedError).message}</h1>
      )}
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
        <form
          className="p-2 w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col mt-2 relative">
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

          <Button isLoading={isLoading}> login</Button>
        </form>
        <div className="flex items-center">
          <h1 className="text-gray-700 text-[13px] sm:text-[15px]   mr-4">
            don't have account{" "}
          </h1>
          <h1
            className="text-secondly text-[13px]  sm:text-[15px] underline cursor-pointer"
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
