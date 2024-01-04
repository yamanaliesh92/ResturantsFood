import React from "react";
import { useAllEventQuery } from "../../redux/api/event.api";
import EventCard from "../Event-card/EventCard";

const Events = () => {
  const { data, error, isLoading } = useAllEventQuery({});

  console.log("date", data);
  return (
    <div className="w-full dark:bg-black mx-auto my-auto">
      <div className="text-[27px] mt-3 text-center md:text-start font-[600]  pb-[20px]">
        <h1 className="text-center text-black dark:text-white">Event</h1>
      </div>
      {isLoading && <h1>loading....</h1>}

      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      <div className="w-full p-6">
        {data && data.map((item) => <EventCard data={item} />)}
      </div>
    </div>
  );
};

export default Events;
