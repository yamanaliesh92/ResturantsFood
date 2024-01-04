import Header from "../components/header/header";
import { Link, useParams } from "react-router-dom";
import Footer from "../layout/footer/footer";

import { useGetOneRestaurantQuery } from "../redux/api/resturant.api";

import { useState } from "react";
import EventCard from "../components/Event-card/EventCard";
import OrderData from "../components/order-data/orderData";

export default function RestaurantPage() {
  const { id } = useParams();

  const { data } = useGetOneRestaurantQuery({ id: Number(id) });

  const [order, setOrder] = useState("Order");

  return (
    <div>
      <Header activeHeading={4} />
      <h1 className="my-3 p-3 text-center text-[21px] text-red-500">
        welcome in {data?.name} my address is {data?.address}{" "}
      </h1>
      <div className="f flex items-center justify-center  my-3">
        <button
          onClick={() => setOrder("Order")}
          className={`w-[60px] mr-11 h-[60px] rounded-md p-3 ${
            order === "Order" ? "bg-gray-400" : "bg-white"
          } text-black`}
        >
          Order
        </button>
        <button
          onClick={() => setOrder("Event")}
          className={`w-[60px]  h-[60px] rounded-md p-3 ${
            order === "Event" ? "bg-gray-400" : "bg-white"
          }  text-black`}
        >
          Event
        </button>
      </div>
      {order === "Order" && data?.orders.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="te w-full text-center text-gray-500">
            there is no order for {data.name} restaurant click here to create
            first order for you
          </h1>
          <Link
            className="w-[120px] flex items-center justify-center mr-11 h-[60px] rounded-md p-3 bg-blue-400 text-white"
            to={"/dashboard-createProduct"}
          >
            Crete order
          </Link>
        </div>
      )}

      {order === "Event" && data?.events.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="te w-full text-center text-gray-500">
            there is no order for {data.name} restaurant click here to create
            first order for you
          </h1>
          <Link
            className="w-[120px] flex items-center justify-center mr-11 h-[60px] rounded-md p-3 bg-blue-400 text-white"
            to={"/dashboard-createEvents"}
          >
            Crete Event
          </Link>
        </div>
      )}
      {order === "Order" && (
        <div className="grid mt-6 grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
          {data && data.orders.map((item) => <OrderData data={item} />)}
        </div>
      )}
      {order === "Event" && (
        <div className="w-full">
          {data &&
            data?.events &&
            data.events.map((event) => <EventCard data={event} />)}
        </div>
      )}
      <Footer />
    </div>
  );
}
