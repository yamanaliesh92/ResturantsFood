import AllEvents from "../components/AllEvents/allEvents";

import Header from "../components/header/header";

const EventPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <div className="w-11/12 mx-auto mt-5">
        <AllEvents owner={false} />
      </div>
    </div>
  );
};

export default EventPage;
