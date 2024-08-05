import { Link } from "react-router-dom";
import SignUpPage from "./SignUpPage";

const LandingPage = () => {
  return (
    <div className="flex flex-col  min-h-screen items-center justify-center">
    <div className="flex flex-col w-full h-1/2 items-center bg-indigo-400 shadow-md shadow-indigo-50">
        <h1 className="text-2xl font-bold text-indigo-50 pt-14">
          Join as a participant
        </h1>
        <p className="text-sm text-gray-600 p-4">No account needed</p>
        <input
          type="text"
          placeholder="# Enter Event Id"
          className="mb-8 p-2 w-3/12 rounded-full focus:outline-indigo-200 focus:ring-2 focus:ring-indigo-600"
        />
    </div>
    <SignUpPage />
</div>
  );
};

export default LandingPage;
