import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./user/LoginPage";
import RegisterPage from "./user/RegisterPage";
import { getWithToken } from "./common/api";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // 앱 시작 시 사용자 정보 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const data = await getWithToken("/api/users/userInfo", token);
      setUser(data);
    } catch (err) {
      console.warn("로그인된 사용자 없음:", err.message);
      setUser(null);
      localStorage.removeItem("token"); // 토큰 만료 시 제거
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // -------------------
  // 사용자 드롭다운 메뉴
  // -------------------
  const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // 클릭 밖에서 닫기
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div ref={menuRef} className="user-menu">
        <button className="user-btn" onClick={() => setOpen(!open)}>
          {user.username} ▼
        </button>
        {open && (
          <div className="dropdown">
            <button onClick={() => navigate("/account")}>계정정보</button>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>
    );
  };

  const HomePage = () => (
    <h3>
      {user
        ? `${user.username}님 SNS프로젝트에 오신 것을 환영합니다!`
        : "환영합니다! SNSProject에 오신 것을 환영합니다."}
    </h3>
  );

  const Logo = () => {
    const navigate = useNavigate();
    return (
      <h1
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        SNS Web
      </h1>
    );
  };

  return (
    <Router>
      <nav className="navbar">
        <Logo />
        <div className="nav-links">
          {!user && <Link to="/login">로그인</Link>}
          {!user && <Link to="/register">회원가입</Link>}
          {user && <UserMenu />}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={fetchUserInfo} />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* 계정정보 페이지 예시 */}
          <Route path="/account" element={<h3>계정 정보 페이지</h3>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
