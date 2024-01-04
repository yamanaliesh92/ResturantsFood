import React, { FC, useContext, useRef, useState } from "react";
import { contextUser } from "../../context/user.context";

import { useUpdateUsernameInfoMutation } from "../../redux/api/user.api";
import Button from "../button";
import Input from "../Input/input";

interface IProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateInfo: FC<IProps> = ({ setEdit }) => {
  const { data: dataMe } = useContext(contextUser);
  const init = {
    username: dataMe.username,
  };

  const [username, setUserName] = useState(init.username);

  const [mutate, { isSuccess: isSuccessUpdateUsername, error, isLoading }] =
    useUpdateUsernameInfoMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await mutate({ username: username });
  };

  if (isSuccessUpdateUsername) {
    setEdit(false);
  }

  return (
    <div className="w-[220px] sm:w-[300px] h-full bg-slate-100 shadow-md p-2 sm:p-5  flex flex-col rounded-md  mt-3">
      {isLoading && <h1>Loading.....</h1>}
      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}

      <h2 className="sm:text-center sm:text-2xl text-gray-900 font-extrabold">
        update Yore info
      </h2>

      <form onSubmit={onSubmit}>
        <Input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          type="text"
          label="User Name"
        />

        <div className="mt-4 flex items-center">
          <Button>edit</Button>
          <Button>cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInfo;
