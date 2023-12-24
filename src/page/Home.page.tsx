import BestDeals from "../components/bestDeals/bestDeals";
import Categorise from "../components/categorise/categorise";
import Events from "../components/Events/events";

import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Footer from "../layout/footer/footer";

const Homepage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <Hero />
      <Categorise />
      <BestDeals />
      <Events />

      <Footer />
    </>
  );
};

export default Homepage;
