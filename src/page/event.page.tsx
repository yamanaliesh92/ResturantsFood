import React from "react";
import EventCard from "../components/EventCard/EventCard";
import Header from "../components/header/header";

const EventPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <div className="w-11/12 mx-auto mt-5">
        my event
        {/* <EventCard active={true} /> */}
      </div>
    </div>
  );
};

export default EventPage;
