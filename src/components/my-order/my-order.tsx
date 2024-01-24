import { SerializedError } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { useGetAllOrdersByUserIdQuery } from "../../redux/api/order.api";
import OrderData from "../order-data/orderData";
export default function MyOrders() {
  const { data, isLoading, error } = useGetAllOrdersByUserIdQuery({});

  return (
    <div className="flex flex-col p-4 w-[100%] bg-white dark:bg-dark">
      {!isLoading && data?.length !== 0 && (
        <h1 className="text-[18px] my-1 text-center text-dark dark:text-white ">
          Welcome in all your orders{" "}
        </h1>
      )}

      {error && <h1 className="error">{(error as SerializedError).message}</h1>}

      {!data?.length && !isLoading && (
        <div className="flex flex-col mt-6  items-center justify-center p-2 ">
          <h1 className="text-2xl text-center text-gray-500 ">
            No Orders Found
          </h1>
          <Link
            to={"/dashboard/products/new"}
            className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer"
          >
            <span className="text-[#fff] flex items-center">create order</span>
          </Link>
        </div>
      )}
      {isLoading && <h1>Loading.....</h1>}
      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-3 grid-[26px] xl:grid-cols-4 xl:grid-[30px]">
        {data &&
          data.map((item) => {
            return <OrderData data={item} />;
          })}
      </div>
    </div>
  );
}
