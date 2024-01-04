import { useNavigate } from "react-router-dom";
import { useAllOrdersQuery } from "../../redux/api/order.api";
import juice from "../../img/juicie.jpeg";
import lance from "../../img/lanchh.jpeg";
import breakFast from "../../img/break.jpeg";
import dessert from "../../img/dessert.jpeg";
const Categorise = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useAllOrdersQuery({});

  const categories = [...new Set(data && data?.map((ite) => ite.category))];
  console.log("cate", categories);

  const handelSubmit = (title: string) => {
    navigate(`orders?category=${title}`);
  };
  return (
    <div
      className="w-full mx-auto my-auto  bg-white dark:bg-black p-6 rounded-lg mb-12"
      id="categorise"
    >
      <h1 className="text-center font-bold my-2 dark:text-white">
        Category is available now{" "}
      </h1>

      {isLoading && <h1>loading....</h1>}

      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2  lg:grid-cols-4  xl:grid-cols-5 ">
        {categories.map((items) => {
          return (
            <div
              onClick={() => handelSubmit(items)}
              className="w-full h-[100px] flex ml-4 items-center dark:bg-[#252222] border dark:border-[#252222] b border-gray-300 rounded-lg justify-between cursor-pointer overflow-hidden"
            >
              <h5 className="text-[15px] uppercase ml-2 dark:text-white">
                {items}
              </h5>

              {items === "lanch" && (
                <img src={lance} className="w-[120px] object-cover" alt="ds" />
              )}

              {items === "breakfast" && (
                <img
                  src={breakFast}
                  className="w-[120px] object-cover"
                  alt="ds"
                />
              )}

              {items === "dessert" && (
                <img
                  src={dessert}
                  className="w-[120px] object-cover"
                  alt="ds"
                />
              )}

              {items === "juice" && (
                <img
                  src={juice}
                  className="w-[100px] my-2 object-cover"
                  alt="ds"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categorise;
