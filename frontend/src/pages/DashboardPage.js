import { Link } from "react-router-dom";
import SignUpPage from "./SignUpPage";

const DashboardPage = () => {
  return (
    <div class="flex flex-col  min-h-screen items-center justify-center">
    <div class="flex flex-col w-full h-1/2 items-center bg-indigo-400 shadow-md shadow-indigo-50">
        <h1 class="text-2xl font-bold text-indigo-50 mt-8">
          Join as a participant
        </h1>
        <p class="text-sm text-gray-600 p-4">No account needed</p>
        <input
          type="text"
          placeholder="# Enter Event Id"
          class="mb-8 p-2 w-3/12 rounded-full focus:outline-indigo-200 focus:ring-2 focus:ring-indigo-600"
        />
    </div>
    <SignUpPage />
</div>
  );
};

export default DashboardPage;
