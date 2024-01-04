import Header from "../components/header/header";
import OrderData from "../components/order-data/orderData";
import { useAllOrdersQuery } from "../redux/api/order.api";

const OrdersPage = () => {
  const { data, isLoading } = useAllOrdersQuery({});
  return (
    <div>
      <Header activeHeading={2} />
      <div className="w-11/12 mx-auto">
        {isLoading && <h1>loading....</h1>}
        <div className="grid mt-6 grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
          {data &&
            data.map((item) => {
              return <OrderData data={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
