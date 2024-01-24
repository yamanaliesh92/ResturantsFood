import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/header";
import OrderDetails from "../components/order-details/orderDetails";

import SuggestProduct from "../components/suggest-order/suggestOrder";
import Footer from "../layout/footer/footer";
import {
  IResponseOrder,
  useGetOneOrderQuery,
  useGetOrderByCategoryQuery,
} from "../redux/api/order.api";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const [data, setData] = useState<IResponseOrder[]>([]);

  const { data: dateGetOneProduct, isLoading } = useGetOneOrderQuery({
    id: Number(id),
  });

  const { data: dataGetByCategory } = useGetOrderByCategoryQuery({
    category: dateGetOneProduct?.category as string,
  });

  useEffect(() => {
    const f =
      dataGetByCategory &&
      dataGetByCategory?.filter((item) => item.id !== dateGetOneProduct?.id);
    if (!f) return;
    setData(f);
  }, [dataGetByCategory, dateGetOneProduct?.id]);

  return (
    <div className="bg-white dark:bg-dark">
      {isLoading && <h1>loading...</h1>}
      <Header activeHeading={4} />
      <div className="flex flex-col">
        <OrderDetails data={dateGetOneProduct} />
        <SuggestProduct data={data} />
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
