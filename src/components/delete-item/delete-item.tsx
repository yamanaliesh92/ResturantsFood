import React, { FC } from "react";

import { AiFillDelete } from "react-icons/ai";
import Button from "../button";

interface IProps {
  deleteItem: (id: number) => Promise<void>;
  id: number;
  close: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: number;
    }>
  >;
}

const DeleteItemModel: FC<IProps> = ({ deleteItem, close, id }) => {
  return (
    <div className="fixed inset-0  z-40  backdrop-blur  h-screen      flex items-center justify-center">
      <div className="p-4 w-[350px]  sm:w-[500px] flex flex-col  relative  bg-black/90 h-fit rounded-md">
        <div className="flex items-center justify-center w-full">
          <AiFillDelete
            size={35}
            className=" text-dangerous text-center cursor-pointer"
          />
        </div>

        <h1 className="text-white text-center my-2">Confirm Delete</h1>
        <h1 className="text-dangerous text-center my-2 font-bold">
          {" "}
          are you sure you want to delete this item ?{" "}
        </h1>
        <div className="flex items-center w-full justify-between  my-2">
          <Button
            onClick={() => close((prev) => ({ open: !prev.open, id: 0 }))}
          >
            Cancel
          </Button>
          <Button bg="bg-dangerous" onClick={async () => await deleteItem(id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModel;
