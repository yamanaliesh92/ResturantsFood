import ShopInfo from "../components/shopInfo/shopInfo";
import ShopProfileData from "../components/shopProfileData/shopPrfoileData";

const ShopHomePage = () => {
  return (
    <div className="w-11/12 mx-auto  my-6 bg-[#f5f5f5]">
      <div className="w-full p-5 flex justify-between ">
        <div className="w-[25%] h-[94vh] sticky z-10 top-10 left-0 shadow-sm overflow-y-scroll bg-[#fff] rounded-[4px]">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[73%] rounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
