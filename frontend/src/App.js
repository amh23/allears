import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogInPage /> } />
          <Route path="/signup" element={<SignUpPage /> } />
          <Route path="/dashboard" element={<DashboardPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
