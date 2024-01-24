import { SerializedError } from "@reduxjs/toolkit";
import React from "react";
import { useAllEventQuery } from "../../redux/api/event.api";
import EventCard from "../Event-card/EventCard";

const Events = () => {
  const { data, error, isLoading } = useAllEventQuery({});

  console.log("date", data);
  return (
    <div className="w-full bg-white  dark:bg-dark mx-auto my-auto">
      <div className="text-[27px] mt-3 text-center md:text-start font-[600]  pb-[20px]">
        <h1 className="title ml-7">All Event:</h1>
      </div>
      {isLoading && <h1>loading....</h1>}

      {error && <h1 className="error">{(error as SerializedError).message}</h1>}
      <div className="w-full p-6">
        {data && data.map((item) => <EventCard data={item} />)}
      </div>
    </div>
  );
};

export default Events;
