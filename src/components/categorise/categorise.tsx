import { useNavigate } from "react-router-dom";
import { useAllOrdersQuery } from "../../redux/api/order.api";
import { brandingData } from "../../sataic/branding.data";
import juicie from "../../img/juicie.jpeg";
import lanch from "../../img/lanchh.jpeg";
const Categorise = () => {
  const navigate = useNavigate();

  const { data } = useAllOrdersQuery({});

  const categories = [...new Set(data && data?.map((ite) => ite.category))];
  console.log("cate", categories);

  const handelSubmit = (title: string) => {
    navigate(`orders?category=${title}`);
  };
  return (
    <>
      <div className="w-11/12 mx-auto my-auto hidden sm:block">
        <div className="b flex justify-between w-full shadow-sm p-5 my-12 rounded-md bg-white">
          {brandingData.map((item) => {
            return (
              <div className="flex items-start" key={item.id}>
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm">{item.Description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="w-11/12 mx-auto my-auto  bg-white p-6 rounded-lg mb-12"
        id="categorise"
      >
        <h1 className="t text-center font-bold my-2">
          Category is available now{" "}
        </h1>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 grid-[10px] lg:grid-cols-4 grid-[20px] xl:grid-cols-5 xl:grid-[30px]">
          {categories.map((items) => {
            return (
              <div
                // key={items.id}
                onClick={() => handelSubmit(items)}
                className="w-full h-[100px] flex items-center border border-gray-300 rounded-lg justify-between cursor-pointer overflow-hidden"
              >
                <h5 className="text-[15px] ml-2">{items}</h5>

                {items === "lanch" && (
                  <img
                    src={lanch}
                    className="w-[120px] object-cover"
                    alt="ds"
                  />
                )}

                {items === "juice" && (
                  <img
                    src={juicie}
                    className="w-[100px] my-2 object-cover"
                    alt="ds"
                  />
                )}
                {/* <img
                  src={items.image_Url}
                  className="w-[120px] object-cover"
                  alt="d"
                /> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categorise;
