import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const CTA = () => {
  const { user } = useAuthContext();
  return (
    <section className="relative overflow-hidden py-28 px-4 bg-gray-900 sm:px-8">
      <div className="w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-12 -right-14 blur-2xl opacity-10"></div>
      <div className="max-w-xl mx-auto text-center relative">
        <div className="py-4">
          <h3 className="text-3xl text-gray-200 font-semibold md:text-4xl">
            Get All The Details of Crime and Asylum Cases
          </h3>
          <p className="text-gray-300 leading-relaxed mt-3">
            Et esse mollit anim tempor Lorem aute fugiat enim laboris consequat.
            Deserunt tempor tempor excepteur aliquip qui magna consectetur ut
            cillum reprehenderit eiusmod elit consequat veniam.
          </p>
        </div>
        <div className="w-2/3 mt-5 mx-auto">
          {user ? (
            <Link
              to="/list"
              className="block w-full mt-2 py-2.5 px-8 text-gray-700 font-bold bg-white rounded-md duration-150 hover:bg-gray-100 sm:w-auto"
            >
              View Cases
            </Link>
          ) : (
            <Link
              to="/login"
              className="block w-full mt-2 py-2.5 px-8 text-gray-700 font-bold bg-white rounded-md duration-150 hover:bg-gray-100 sm:w-auto"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
