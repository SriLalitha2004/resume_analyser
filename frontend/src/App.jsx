import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiveAnalysis from "./pages/LiveAnalysis.jsx";
import ResumeHistory from "./pages/ResumeHistory.jsx";
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Header dark={dark} setDark={setDark} />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <main>
          <Routes>
            <Route path="/" element={<LiveAnalysis />} />
            <Route path="/history" element={<ResumeHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;