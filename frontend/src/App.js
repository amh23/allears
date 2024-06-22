import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/login' element={<LogInPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
