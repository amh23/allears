import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<LogInPage /> } />
          <Route path="/signup" element={<SignUpPage /> } />
          <Route path="/dashboard" element={<DashboardPage /> } />
          <Route path="/" element={<LandingPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
