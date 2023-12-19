import React, { ChangeEvent, useContext, useState } from "react";
import { contextUser } from "../../context/user.context";
import { toast } from "react-toastify";
import {
  IPayloadChangePassword,
  useChangePasswordMutation,
} from "../../redux/api/user.api";

interface IChangePassword {
  email: string;
  password: string;
}

const init: IChangePassword = {
  email: "",
  password: "",
};
const ChangePassword = () => {
  const { data: dataMe } = useContext(contextUser);
  const [element, setElement] = useState<IChangePassword>(init);
  const [mutate] = useChangePasswordMutation();
  const [open, setOpen] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IPayloadChangePassword = {
      password: element.password,
    };
    await mutate(body);
  };

  const SubmitEmail = () => {
    const email = dataMe.email;
    console.log("element", { e: element.email });
    console.log("me", { email });
    if (element.email === email) {
      console.log("email", email);
      setOpen((prev) => !prev);
    }
    toast.error("error try again");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="w-full flex flex-col items-center mt-4 p-4 bg-white">
      <h1 className="text-[24px] font-bold text-red-600 my-3">
        Change Password
      </h1>
      {/* <form className="w-full mt-2 p-2 flex items-center flex-col"> */}
      <div className=" h-[60px] w-[50vw] flex justify-end">
        {open ? (
          <>
            <form onSubmit={submit}>
              <input
                className="w-full relative h-full outline-none rounded-md p-2"
                type={"text"}
                name={"password"}
                value={element.password}
                onChange={onChange}
                placeholder="write the new password"
              />
              <button
                onSubmit={SubmitEmail}
                className="d absolute outline-none border-none  right-[200px] bottom-[4000px] w-[100px] p-4 bg-red-400"
              >
                Update
              </button>
            </form>
          </>
        ) : (
          <>
            <button onClick={SubmitEmail} className="w-[100px] p-4 bg-red-400">
              Donedd
            </button>
            <input
              className="w-full relative h-full outline-none rounded-md p-2"
              type={"email"}
              name={"email"}
              value={element.email}
              onChange={onChange}
              placeholder="write Your email"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
