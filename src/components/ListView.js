import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAdminTable from "../hooks/useAdminTable";
import useAuthContext from "../hooks/useAuthContext";

const ListView = () => {
  const [isAsylum, setIsAsylum] = useState("");
  const { data, pending } = useAdminTable("cases");
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && user.displayName === "asylum") {
      setIsAsylum("asylum");
    } else {
      setIsAsylum("");
    }
  }, [user]);

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl lg:px-8">
      <div className="text-center">
        <h1 className="md:text-left text-3xl text-gray-50 font-semibold">
          View Cases
        </h1>
        <div className="flex gap-5 items-center justify-center md:justify-start mt-5">
          {!isAsylum && (
            <Link
              to="/crimeform"
              className="px-5 py-1 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
            >
              Submit Crime
            </Link>
          )}
          <Link
            to="/asylumform"
            className="px-5 py-1 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
          >
            Submit Asylum
          </Link>
        </div>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {/* Pending State */}
        {pending && <div className="text-3xl text-gray-50">Loading...</div>}
        {data &&
          data
            .filter((data) =>
              isAsylum
                ? data.approved === true && data.caseType === "asylum"
                : data.approved
            )
            .map((items) => (
              <article
                className="lg:hover:scale-105 max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
                key={items.id}
              >
                <Link to="#">
                  <img
                    src={items.frontFace}
                    loading="lazy"
                    alt={items.title}
                    className="w-full h-auto rounded-t-md"
                  />
                  <div className="flex items-center py-2 px1 text-left">
                    <div className="ml-3">
                      <span className="block text-gray-50">{items.name}</span>
                      <span className="block text-gray-400 text-sm">
                        {items.caseType}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
      </div>
    </section>
  );
};

export default ListView;
