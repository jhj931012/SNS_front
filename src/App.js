import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import LoginPage from "./user/LoginPage";
import RegisterPage from "./user/RegisterPage";
import "./App.css"; // CSS 파일 임포트

function App() {
  // 홈페이지 컴포넌트 App.js 안에 정의
  function HomePage() {
    return <h3>환영합니다! SNSProject에 오신 것을 환영합니다.</h3>;
  }

  return (
    <Router>
      <nav className="navbar">
        <h1 className="logo">SNS Web</h1>
        <div className="nav-links">
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          {/* / 접속 시 홈페이지 보여주기 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 잘못된 경로 접근 시 /로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
