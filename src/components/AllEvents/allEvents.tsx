import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { contextUser } from "../../context/user.context";
import { useMyEventsQuery } from "../../redux/api/event.api";
import EventCard from "../EventCard/EventCard";

interface IProps {
  owner: boolean;
}

const AllEvents: FC<IProps> = ({ owner }) => {
  const { data, error, isLoading } = useMyEventsQuery({});

  const { data: dateMe } = useContext(contextUser);

  console.log("dat", data);

  return (
    <div className="w-full flex-col flex">
      {owner && (
        <h1 className=" text-center text-gray-400 font-bold p-3">
          welcome in your event mr {dateMe.username}
        </h1>
      )}

      {isLoading && <h1>loading....</h1>}

      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}

      <div className="w w-full">
        {data && data.map((item) => <EventCard data={item} />)}
      </div>
      {data?.length === 0 && (
        <div className="flex flex-col p-2 ">
          <h1 className="tex text-red-400 my-2">you don't have any event</h1>
          <Link to={"/dashboard-createEvent"}>Create a event</Link>
        </div>
      )}
    </div>
  );
};

export default AllEvents;
