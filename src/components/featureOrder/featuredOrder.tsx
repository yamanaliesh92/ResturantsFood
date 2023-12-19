import { productData } from "../../sataic/product.data";
import ProductsData from "../productData/productData";

const FeaturedOrder = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
          <h1>Featured Product</h1>
        </div>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
          {productData.map((item) => {
            // return <ProductsData data={item} />;
            return "pp";
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedOrder;
