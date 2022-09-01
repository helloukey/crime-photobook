import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAsylumForm from "../hooks/useAsylumForm";

// assets
import asylum from "../assets/asylum.svg";
import errorIcon from "../assets/error.svg";
import useAuthContext from "../hooks/useAuthContext";

const AsylumForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [frontFace, setFrontFace] = useState("");
  const [frontFaceError, setFrontFaceError] = useState("");
  const { pending, error, response, asylumFormFirebase } = useAsylumForm();

  // redirect navigate
  const navigate = useNavigate();

  // current user
  const { user } = useAuthContext();

  const handleFrontFace = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFrontFaceError("Please select a front face image.");
      return;
    }
    if (!selectedFile.type.includes("image")) {
      setFrontFaceError("Please select a image file.");
      return;
    }
    if (selectedFile.size > 100000) {
      setFrontFaceError("Image size should be less than 100kb.");
      return;
    }
    setFrontFaceError(null);
    setFrontFace(selectedFile);
  };

  const handleAsylumForm = (e) => {
    e.preventDefault();
    asylumFormFirebase(name, address, height, weight, frontFace);
  };

  useEffect(() => {
    if (response) {
      navigate("/list");
    }
  }, [response, navigate]);

  return (
    <div className=" bg-gray-900 text-gray-50 py-12 sm:py-16 md:py-24 lg:pt-24 lg:pb-36">
      <div className="text-left mx-auto max-w-screen-xl pb-12 px-4 items-start gap-16 lg:flex md:px-8">
        <form className="lg:w-2/4" onSubmit={handleAsylumForm}>
          <h3 className="text-3xl mb-4 lg:text-6xl font-semibold">
            Asylum Form
          </h3>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block py-3 text-gray-500 lg:text-xl"
            >
              Name
            </label>
            <div className="flex items-center p-1 border rounded-md">
              <input
                type="name"
                placeholder="John Cena"
                id="name"
                className="w-full py-2 px-1 ml-3 text-gray-500 outline-none bg-transparent lg:text-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block py-3 text-gray-500 lg:text-xl"
            >
              Address
            </label>
            <div className="flex items-center p-1 border rounded-md">
              <input
                type="name"
                placeholder="Walt Street Jr. 72"
                id="address"
                className="w-full py-2 px-1 ml-3 text-gray-500 outline-none bg-transparent lg:text-xl"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Height */}
          <div>
            <label
              htmlFor="height"
              className="block py-3 text-gray-500 lg:text-xl"
            >
              Height (cm)
            </label>
            <div className="flex items-center p-1 border rounded-md">
              <input
                type="number"
                placeholder="176"
                id="height"
                className="w-full py-2 px-1 ml-3 text-gray-500 outline-none bg-transparent lg:text-xl"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Weight */}
          <div>
            <label
              htmlFor="weight"
              className="block py-3 text-gray-500 lg:text-xl"
            >
              Weight (kg)
            </label>
            <div className="flex items-center p-1 border rounded-md">
              <input
                type="number"
                placeholder="80"
                id="weight"
                className="w-full py-2 px-1 ml-3 text-gray-500 outline-none bg-transparent lg:text-xl"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Face View */}
          <div>
            <label
              htmlFor="face"
              className="block py-3 text-gray-500 lg:text-xl"
            >
              Upload a photo
            </label>
            <div className="flex items-center p-1 border rounded-md">
              <input
                type="file"
                placeholder="12345678"
                id="face"
                className="file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-400 file:text-gray-50
                hover:file:bg-violet-100 hover:file:text-gray-900 hover:file:cursor-pointer w-full py-2 px-1 ml-3 text-gray-500 outline-none bg-transparent lg:text-xl"
                onChange={handleFrontFace}
                required
              />
            </div>
          </div>
          {/* Crime link */}
          {user && user.displayName !== "asylum" &&
          <div className="my-5 text-lg">
            <p>
              Crime Case?{" "}
              <Link
                to="/crimeform"
                className="text-indigo-400 font-bold hover:underline"
              >
                Submit Here
              </Link>
            </p>
          </div>
          }
          {/* File Error Message */}
          {frontFaceError && (
            <div className="py-2 px-1 bg-red-50 flex items-center gap-2 rounded">
              <img src={errorIcon} alt="error" className="w-5 h-5 mx-1" />
              <p className="text-red-600 font-semibold">{frontFaceError}</p>
            </div>
          )}
          {/* Firebase Error Message */}
          {error && (
            <div className="py-2 px-1 bg-red-50 flex items-center gap-2 rounded">
              <img src={errorIcon} alt="error" className="w-5 h-5 mx-1" />
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}
          {/* Submit Button */}
          <div>
            <div className="flex items-center mt-10">
              {pending ? (
                <button className="pointer-events-none transition hover:bg-gray-700 w-full py-4 px-1 text-gray-500 outline-none bg-gray-800 rounded-md shadow-xl font-bold">
                  Submitting...
                </button>
              ) : (
                <button className="transition hover:bg-gray-700 w-full py-4 px-1 text-gray-500 outline-none bg-gray-800 rounded-md shadow-xl font-bold">
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
        {/* Image for desktop */}
        <div className="hidden lg:block w-2/4 pt-8">
          <img src={asylum} alt="asylum" className="w-full" />
        </div>
      </div>
    </div>
  );
};
export default AsylumForm;
