import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogInPage /> } />
          <Route path="/signup" element={<SignUpPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
