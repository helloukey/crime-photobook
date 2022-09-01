const Hero = () => {
  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Customers", path: "#" },
    { title: "Careers", path: "#" },
  ];

  return (
    <div className="bg-gray-900 pb-20">
      <section className="mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-5xl xl:text-7xl">
            Upgraded System
            <span className="text-indigo-400"> Better Analysis</span>
          </h1>
          <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Et esse mollit anim tempor Lorem aute fugiat enim laboris consequat.
            Deserunt tempor tempor excepteur aliquip qui magna consectetur ut
            cillum reprehenderit eiusmod elit consequat veniam.
          </p>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
            src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png"
            className="w-full mx-auto sm:w-10/12  lg:w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
