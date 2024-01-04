import { useAllOrdersQuery } from "../../redux/api/order.api";
import OrderData from "../order-data/orderData";

const BestDeals = () => {
  const { data, isLoading, error } = useAllOrdersQuery({});

  return (
    <div className="w-full mx-auto my-auto dark:bg-black bg-white">
      <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
        <h1 className="text-center text-black dark:text-white">All Orders</h1>
      </div>

      {isLoading && <h1>loading....</h1>}

      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}

      {isLoading && <h1>loading.....</h1>}
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
