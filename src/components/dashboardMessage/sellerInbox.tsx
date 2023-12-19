import { FC } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IReview } from "../../sataic/allReview.data";

interface IProps {
  data: IReview;
}

const SellerInbox: FC<IProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-between p-2">
      <div className="flex items-center ">
        <img src={data.image_Url} alt="ass" className="" />
        <div className="flex flex-col ml-3">
          <h2>{data.username}</h2>
          <p>active now</p>
        </div>
      </div>
      <AiOutlineArrowRight size={25} />
    </div>
  );
};

export default SellerInbox;
