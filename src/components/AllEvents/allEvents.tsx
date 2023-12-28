import React, { FC, useContext } from "react";
import { contextUser } from "../../context/user.context";
import { useMyEventsQuery } from "../../redux/api/event.api";
import EventCard from "../EventCard/EventCard";

interface IProps {
  owner: boolean;
}

const AllEvents: FC<IProps> = ({ owner }) => {
  const { data } = useMyEventsQuery({});

  const { data: dateMe } = useContext(contextUser);

  console.log("dat", data);

  return (
    <div className="w-full flex-col flex">
      {owner && (
        <h1 className=" text-center text-gray-400 font-bold p-3">
          welcome in your event mr {dateMe.username}
        </h1>
      )}
      <div className="w w-full">
        {data && data.map((item) => <EventCard data={item} />)}
      </div>
    </div>
  );
};

export default AllEvents;
