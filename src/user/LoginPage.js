import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../common/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await post("/api/users/login", {
        username,
        password,
      });

      // ✅ 백엔드 응답: { accessToken: "JWT값" }
      localStorage.setItem("token", data.accessToken);

      alert("로그인 성공! 🎉");
      console.log("JWT 토큰:", data.accessToken);

      // TODO: 메인 화면 이동
      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error.message);
      alert(error.message || "로그인에 실패했습니다.");
    }
  };

  // 스타일 객체
  const styles = {
    container: {
      backgroundColor: "#fff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      maxWidth: "400px",
      margin: "0 auto",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "16px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    button: {
      padding: "10px",
      backgroundColor: "#1d4ed8",
      color: "white",
      fontWeight: "bold",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>로그인</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
