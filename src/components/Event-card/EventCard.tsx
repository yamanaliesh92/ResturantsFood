import { IStateRedux } from "@/src/redux/store";
import { SerializedError } from "@reduxjs/toolkit";
import { FC, useContext, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { contextUser } from "../../context/user.context";
import {
  IResponseEvent,
  useDeleteEventMutation,
} from "../../redux/api/event.api";
import { useAllRestaurantQuery } from "../../redux/api/resturant.api";
import UpdateEvent from "../update-event/update.event";
import CountDown from "./countDown";

interface IProps {
  active?: boolean;
  data: IResponseEvent;
}

const EventCard: FC<IProps> = ({ active, data }) => {
  const [edit, setEdit] = useState({ id: 0, open: false });
  const [openDeleteModel, setOpemDeleteModel] = useState({
    id: 0,
    open: false,
  });

  const openEdit = (id: number) => {
    setEdit((prev) => ({ id: id, open: !prev.open }));
  };

  const { data: dateMe } = useContext(contextUser);

  const mode = useSelector((state: IStateRedux) => state.theme.mode);

  const [mutate, { isLoading, error: errorDeleteEvent }] =
    useDeleteEventMutation();

  const deleteEvent = async (id: number) => {
    await mutate({ id: id });
  };

  const {
    data: dataAllRestaurant,
    error,
    isLoading: isLoadingGetAllResturant,
  } = useAllRestaurantQuery({});
  return (
    <div className=" flex-col w-[500px] p-3 sm:p-0  flex sm:flex-row mt-2 sm:w-full h-auto items-center dark:bg-white bg-dark rounded-lg">
      {isLoading && <h1>loading....</h1>}
      {isLoadingGetAllResturant && <h1>loading....</h1>}

      {errorDeleteEvent && (
        <h1 className="error">{(error as SerializedError).message}</h1>
      )}

      <div className="w-full my-2 ml-1 mr-3   sm:w-[40%] md:w-[70%] ">
        <img
          src={data.imgOrder}
          alt="dd"
          className="w-[200px] rounded-md h-[250px]"
        />
      </div>
      <div className="w-full mr-2 sm:ml-0 mt-2 sm:mt-0  flex flex-col">
        <div className="flex justify-between">
          <h5 className="text-[16px] sm:text-[22px]  md:text-[25px]  text-white dark:text-dark">
            {data.name}
          </h5>
          {data.userId === dateMe?.id && (
            <div className="flex  items-center">
              <AiFillEdit
                size={20}
                color={!mode ? "white" : "blue"}
                cursor="pointer"
                className="mr-4"
                onClick={() => openEdit(data.id)}
              />
              <AiFillDelete
                cursor="pointer"
                color={!mode ? "white" : "blue"}
                size={20}
                className="mr-4 "
                onClick={() => deleteEvent(data.id)}
              />
            </div>
          )}
        </div>
        {dataAllRestaurant &&
          dataAllRestaurant.map((item) => (
            <>
              {data.restaurantId === item.id && (
                <div className="my-1 flex items-center">
                  <h3 className="text-[12px] sm:text-[19px] text-white dark:text-dark">
                    the event offers from:
                  </h3>
                  <h3 className="font-bold text-[12px] sm:text-[19px] ml-1 text-red-500">
                    {item.name} restaurant
                  </h3>
                </div>
              )}
            </>
          ))}
        <p className="h-[65px] my-2 overflow-auto text-white dark:text-dark">
          {data.description}
        </p>
        <div className="flex py-2 items-center">
          <div className="flex items-center">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.newPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-white dark:text-dark">
              {data.oldPrice}
            </h5>
          </div>
          <div className=" ml-10 w-[70px] bg-white dark:bg-dark flex items-center justify-center p-2  rounded-md font-[400] text-[17px] dark:text-white text-dark">
            <h1>{data.category}</h1>
          </div>
        </div>
        <CountDown data={data} />
      </div>
      {edit.open && edit.id === data.id ? (
        <UpdateEvent data={data} setOpen={setEdit} />
      ) : null}
    </div>
  );
};

export default EventCard;
