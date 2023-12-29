import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/header";

import ProductsDetails from "../components/orderDetails/orderDetails";
import SuggestProduct from "../components/suggestOrder/suggestOrder";
import Footer from "../layout/footer/footer";
import {
  IResponseOrder,
  useGetOneOrderQuery,
  useGetOrderByCategoryQuery,
} from "../redux/api/order.api";

const ProductDetailsPage = () => {
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
    <div>
      {isLoading && <h1>loading...</h1>}
      <Header activeHeading={4} />
      <ProductsDetails data={dateGetOneProduct} />
      <SuggestProduct data={data} />
      {/* <ProductDetailsInfo data={data} /> */}

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
