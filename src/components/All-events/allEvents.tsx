import { SerializedError } from "@reduxjs/toolkit";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { contextUser } from "../../context/user.context";
import { useMyEventsQuery } from "../../redux/api/event.api";
import EventCard from "../Event-card/EventCard";

interface IProps {
  owner: boolean;
}

const AllEvents: FC<IProps> = ({ owner }) => {
  const { data, error, isLoading } = useMyEventsQuery({});

  const { data: dateMe } = useContext(contextUser);

  return (
    <div className="w-full flex-col flex">
      {owner && (
        <h1 className=" text-center text-dark dark:text-white font-bold p-3">
          Welcome in your event mr {dateMe.username}
        </h1>
      )}

      {isLoading && <h1>loading....</h1>}

      {error && <h1 className="error">{(error as SerializedError).message}</h1>}

      <div className="w w-full">
        {data && data.map((item) => <EventCard data={item} />)}
      </div>
      {!data?.length && !isLoading && (
        <div className="flex flex-col mt-6  items-center justify-center p-2 ">
          <h1 className="text-2xl text-center text-gray-500 ">
            No Events Found
          </h1>
          <Link
            to={"/dashboard/events/new"}
            className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer"
          >
            <span className="text-[#fff] flex items-center">create event</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllEvents;
