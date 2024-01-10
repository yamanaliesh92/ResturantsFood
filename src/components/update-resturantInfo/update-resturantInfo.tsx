import React, { FC } from "react";
import { useForm } from "react-hook-form";

import {
  IResponseRestaurant,
  useUpdateRestaurantInfoMutation,
} from "../../redux/api/resturant.api";
import Button from "../button";
import Input from "../Input/input";

interface IProps {
  data: IResponseRestaurant | undefined;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IUpdate {
  id?: number;
  address?: string;
  name?: string;
}
const UpdateRestaurantInfo: FC<IProps> = ({ setEdit, data }) => {
  const [mutate, { isSuccess, isLoading, error }] =
    useUpdateRestaurantInfoMutation();

  const form = useForm({
    defaultValues: {
      name: data?.name,
      address: data?.address,
      id: data?.id,
    },
  });
  const { register, handleSubmit } = form;

  if (isSuccess) {
    setEdit(false);
  }

  const onSubmit = async (data: IUpdate) => {
    const body = {
      name: data.name,
      address: data.address,
    };
    await mutate({ id: data.id as number, payload: body });
  };

  return (
    <div className="w-[190px] sm:w-[500px] mt-5 h-[350px] dark:bg-white bg-blue-950 shadow-md p-0 sm:p-5  flex flex-col rounded-md">
      {error && (
        <h1 className="text-[15px] text-red-500 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      <h2 className="sm:text-center text-[18px] text-white dark:text-blue-950 ">
        Update your restaurant information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-2 p-2">
          <Input {...register("name")} label="Name" type="text" />
        </div>

        <div className="mt-4 flex flex-col p-2">
          <Input {...register("address")} label="Address" type="text" />
        </div>

        <div className="mt-4 p-2 block sm:flex sm:items-center sm:justify-between">
          <Button onClick={() => setEdit(false)}>cancel</Button>

          <Button isLoading={isLoading}>edit</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurantInfo;
