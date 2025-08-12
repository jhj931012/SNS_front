import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./user/LoginPage";
import RegisterPage from "./user/RegisterPage";

function App() {
  return (
    <Router>
      <nav className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold text-blue-500">SNS Web</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-blue-500 hover:underline">로그인</Link>
          <Link to="/register" className="text-blue-500 hover:underline">회원가입</Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto mt-10">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
