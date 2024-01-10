import { useAllOrdersQuery } from "../../redux/api/order.api";
import OrderData from "../order-data/orderData";

const BestDeals = () => {
  const { data, isLoading, error } = useAllOrdersQuery({});

  return (
    <div className="w-full bg-white  dark:bg-blue-950">
      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}

      {isLoading && <h1>loading....</h1>}

      <h1 className="title  ml-10">All Orders:</h1>

      <div className="grid p-7 grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
        {data &&
          data.map((item) => {
            return <OrderData data={item} />;
          })}
      </div>
    </div>
  );
};

export default BestDeals;
