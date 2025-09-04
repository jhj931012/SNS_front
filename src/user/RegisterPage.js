import React, { useState } from "react";
import { post } from "../common/api"; // 공통 API 함수 임포트

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const requestBody = { username, nickname, email, password };

    try {
      const data = await post("/api/users/signup", requestBody);
      console.log("회원가입 성공:", data);
      alert("회원가입 성공!");
      // 필요하면 로그인 페이지로 이동
      // navigate("/login") 사용 가능
    } catch (error) {
      alert("회원가입 실패: " + error.message);
    }
  };

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
      backgroundColor: "#16a34a",
      color: "white",
      fontWeight: "bold",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>회원가입</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
