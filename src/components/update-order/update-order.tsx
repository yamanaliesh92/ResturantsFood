import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import React, { ChangeEvent, FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPhotograph } from "react-icons/hi";
import { z } from "zod";

import {
  IResponseOrder,
  useUpdateOrderImgMutation,
  useUpdateOrderMutation,
} from "../../redux/api/order.api";
import Button from "../button";
import Input from "../Input/input";

interface IProps {
  data: IResponseOrder;
  activeOpen: string;
  open: {
    open: boolean;
    id: number;
  };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: number;
    }>
  >;
}

const UpdateOrderModal: FC<IProps> = ({ data, setOpen }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [
    mutateUpdateImg,
    { isSuccess: isSuccessUpdateImg, error: errorUpdateImg },
  ] = useUpdateOrderImgMutation();

  const [updateImg, setUpdateImg] = useState<File | null>(null);
  const [openUpdateImg, setOpenUpdateImg] = useState(false);

  const [mutate, { isLoading, isSuccess, error }] = useUpdateOrderMutation();

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const value = e.target.files[0];
    setUpdateImg(value);
  };

  const schema = z.object({
    name: z

      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })

      .refine((data) => data.trim() !== "", {
        message: "Name cannot be an empty string",
      }),

    price: z.coerce
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .int()
      .gte(1)
      .lte(99999),
    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Category cannot be an empty string",
      }),

    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Description cannot be an empty string",
      }),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: data.category,
      name: data.name,
      price: data.price,
      description: data.description,
    },
  });

  const { errors } = formState;

  if (isSuccess) {
    setOpen((prev) => ({ id: 0, open: false }));
  }

  const submit = async (body: Schema) => {
    const dto = {
      category: body.category,
      description: body.description,
      name: body.name,
      price: Number(body.price),
    };
    await mutate({ id: data.id, payload: dto });

    const formData = new FormData();
    formData.append("imgOrder", updateImg as any);
    openUpdateImg &&
      (await mutateUpdateImg({ id: data.id, img: formData as any }));
  };

  if (isSuccess) {
    setOpen((prev) => ({ ...prev, open: !prev.open }));
  }
  if (isSuccessUpdateImg) {
    setOpen((prev) => ({ ...prev, open: !prev.open }));
  }

  const openGallery = () => {
    setOpenUpdateImg(true);
    inputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm  h-screen top-0   left-0 flex items-center justify-center">
      <div className="bg-dark   mt-1 dark:bg-white mb-2 h-fit   text-white dark:text-dark p-2 w-[300px]  sm:w-[500px]  rounded-md shadow-sm flex flex-col relative ">
        <h1
          className="text-end mr-1 text-2xl"
          onClick={() => setOpen((prev) => ({ id: 0, open: !prev.open }))}
        >
          X
        </h1>

        <form
          className="p-3 w-full  flex flex-col"
          onSubmit={handleSubmit(submit)}
        >
          {isLoading && <h1>Loading.....</h1>}
          {error && (
            <h1 className="error">{(error as SerializedError).message}</h1>
          )}

          {errorUpdateImg && (
            <h1 className="error">{(error as SerializedError).message}</h1>
          )}
          <div className="mt-2 flex flex-col relative ">
            <h1 className="error">{errors.name?.message}</h1>
            <Input {...register("name")} label="Name" type="text" />
          </div>
          <div className="flex flex-col mt-2 relative">
            <h1 className="error">{errors.category?.message}</h1>
            <Input
              {...register("category")}
              name="category"
              label="Category"
              type="text"
            />
          </div>
          <div className="flex flex-col mt-2 relative">
            <h1 className="error">{errors.price?.message}</h1>
            <Input
              {...register("price")}
              type="number"
              label="Price"
              name="price"
            />
          </div>
          <div className="flex flex-col mt-2 relative">
            <h1 className="error">{errors.description?.message}</h1>
            <label className="mt-2">Description</label>
            <textarea
              {...register("description")}
              name="description"
              rows={3}
              className="w-[75%] bg-white text-dark dark:bg-white dark:text-dark  mt-1  h-[55px] outline-0 text-sm  p-2 rounded-md placeholder-gray-400 "
            />
          </div>

          <div className="flex mt-2 items-center p-2">
            <h3 className="block text-sm  mr-2 dark:text-blue-900 text-white font-medium">
              click in icon to change your photo
            </h3>

            <HiPhotograph
              onClick={openGallery}
              size={20}
              className="dark:text-dark"
            />
          </div>
          <div style={{ display: "none" }}>
            <input ref={inputRef} onChange={onChangeImg} type={"file"} />
          </div>

          <Button isLoading={isLoading}>update</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
