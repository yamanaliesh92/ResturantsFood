import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/header";
import ProductDetailsInfo from "../components/productDeatilsInfo/productDeatilsInfo";
import ProductsDetails from "../components/prouctdeatils/ ProductsDetails";
import SuggestProduct from "../components/suggestOrder/suggestOrder";
import Footer from "../layout/footer/footer";
import {
  useGetOneOrderQuery,
  useGetOrderByCategoryQuery,
} from "../redux/api/order.api";
import { IProductData, productData } from "../sataic/product.data";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const { data: dateGetOneProduct, isLoading } = useGetOneOrderQuery({
    id: Number(id),
  });

  const { data: dataGetByCategory } = useGetOrderByCategoryQuery({
    category: dateGetOneProduct?.category as string,
  });

  console.log("dataOne", { d: dateGetOneProduct?.category });

  console.log("dataGaterway", { dataGetByCategory });

  const [data, setData] = useState<IProductData>();

  // useEffect(() => {
  //   const find = productData.find((i) => i.id === (id as any));
  //   if (!find) return;
  //   setData(find);
  // }, [id]);

  return (
    <div>
      <Header activeHeading={4} />
      <ProductsDetails data={dateGetOneProduct} />
      <SuggestProduct data={dataGetByCategory} />
      {/* <ProductDetailsInfo data={data} /> */}

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
