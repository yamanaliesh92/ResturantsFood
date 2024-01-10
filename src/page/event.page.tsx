import Events from "../components/Events/events";

import Header from "../components/header/header";

const EventPage = () => {
  return (
    <div className="bg-white dark:bg-blue-950">
      <Header activeHeading={4} />
      <div className="w-full  mx-auto mt-5">
        <Events />
      </div>
    </div>
  );
};

export default EventPage;
