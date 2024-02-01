import { useSelector } from "react-redux";
import BestDeals from "../components/all-order/allOrder";
import Categorise from "../components/categorise/categorise";
import Events from "../components/Events/events";

import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Footer from "../layout/footer/footer";
import { IStateRedux } from "../redux/store";

const Homepage = () => {
  const theme = useSelector((state: IStateRedux) => state.theme.mode);

  console.log("them ", theme);
  return (
    <div className="  dark:bg-dark bg-white" data-theme="dark">
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
