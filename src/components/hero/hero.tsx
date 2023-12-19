const Hero = () => {
  return (
    <div
      className="relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat flex fex-col items-center"
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="w-[90%] mx-auto my-auto 800px:w-[60%]">
        <h1 className="text-[35px] 800px:text-[60px] font-[600] text-[#3d3a3a]">
          Best collection for <br /> Home Decoration
        </h1>
        <p className="p pt-5 text-[400] text-[#0000ba] text-[16px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sunt
          corporis quidem ex autem tenetur enim, aliquid labore? Sequi eum
          similique consequuntur nisi placeat delectus iusto repellat quaerat
          error? Porro.
        </p>

        <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
          <span className="text-[#fff] flex items-center">Shop Now</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
