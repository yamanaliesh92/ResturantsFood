import React from "react";
import { useAllEventQuery } from "../../redux/api/event.api";
import EventCard from "../EventCard/EventCard";

const Events = () => {
  const { data } = useAllEventQuery({});

  console.log("date", data);
  return (
    <div className="w-11/12 mx-auto my-auto">
      <div className="text-[27px] mt-3 text-center md:text-start font-[600] font-Roboto pb-[20px]">
        <h1>Event</h1>
      </div>
      <div className="w-full">
        {data && data.map((item) => <EventCard data={item} />)}
      </div>
    </div>
  );
};

export default Events;
