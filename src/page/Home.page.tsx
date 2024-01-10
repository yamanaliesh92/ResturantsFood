import BestDeals from "../components/all-order/allOrder";
import Categorise from "../components/categorise/categorise";
import Events from "../components/Events/events";

import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Footer from "../layout/footer/footer";

const Homepage = () => {
  return (
    <div className="  dark:bg-blue-950 bg-white">
      <Header activeHeading={1} />
      <Hero />
      <Categorise />
      <BestDeals />
      <Events />

      <Footer />
    </div>
  );
};

export default Homepage;
