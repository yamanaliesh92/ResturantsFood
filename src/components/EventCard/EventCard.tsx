import { FC, useContext, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
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

  const openEdit = (id: number) => {
    setEdit((prev) => ({ id: id, open: !prev.open }));
  };

  const { data: dateMe } = useContext(contextUser);

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
    <div className=" flex-col  flex sm:flex-row mt-2 w-full h-auto items-center bg-white rounded-lg">
      {isLoading && <h1>loading....</h1>}
      {isLoadingGetAllResturant && <h1>loading....</h1>}

      {errorDeleteEvent && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      <div className="w-full  sm:w-[40%] md:w-[70%] mr-2">
        <img src={data.imgOrder} alt="dd" className="w-[200px] h-[250px]" />
      </div>
      <div className="w-full mt-2 sm:mt-0  flex flex-col">
        <div className="flex justify-between">
          <h5 className="text-[16px] sm:text-[22px]  md:text-[25px] font-[600] font-Roboto text-[#333]">
            {data.name}
          </h5>
          {data.userId === dateMe.id && (
            <div className="flex  items-center">
              <AiFillEdit
                size={15}
                cursor="pointer"
                className="mr-4"
                onClick={() => openEdit(data.id)}
              />
              <AiFillDelete
                cursor="pointer"
                size={15}
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
                  <h3 className="text-[12px] sm:text-[19px]">
                    the event offers from:
                  </h3>
                  <h3 className="font-bold text-[12px] sm:text-[19px] ml-1 text-red-500">
                    {item.name} restaurant
                  </h3>
                </div>
              )}
            </>
          ))}
        <p className="h-[65px] my-2 overflow-auto">{data.description}</p>
        <div className="flex py-2 items-center justify-between">
          <div className="flex items-center">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.newPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.oldPrice}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.category}
          </span>
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
