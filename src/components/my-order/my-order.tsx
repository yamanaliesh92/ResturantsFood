import { useGetAllOrdersByUserIdQuery } from "../../redux/api/order.api";
import OrderData from "../orderData/orderData";
export default function MyOrders() {
  const { data, isLoading } = useGetAllOrdersByUserIdQuery({});
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl text-center text-gray-500 ">
        welcome in all your orders{" "}
      </h1>
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
