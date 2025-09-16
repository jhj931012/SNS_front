import axios from "axios";

const BASE_URL = "http://localhost:8081"; // 백엔드 URL

// 공통 POST 요청
export async function post(endpoint, data) {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // 쿠키/세션 사용 시
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 오류:", error);

    if (error.response) {
      const resData = error.response.data;

      // resData가 객체라면 key=value 형태로 변환
      if (typeof resData === "object") {
        const messages = Object.entries(resData)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join("\n");
        throw new Error(messages);
      } else {
        // 문자열이면 그대로 사용
        throw new Error(resData || "API 요청 실패");
      }
    } else if (error.request) {
      throw new Error("서버 응답 없음");
    } else {
      throw new Error(error.message);
    }
  }
}


// 공통 GET 요청
export async function get(endpoint) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 오류:", error);
    if (error.response) throw new Error(error.response.data.message || "API 요청 실패");
    else if (error.request) throw new Error("서버 응답 없음");
    else throw new Error(error.message);
  }
}

// 토큰 기반 GET 요청
export async function getWithToken(endpoint, token) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 토큰 헤더 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 오류:", error);
    if (error.response) throw new Error(error.response.data.message || "API 요청 실패");
    else if (error.request) throw new Error("서버 응답 없음");
    else throw new Error(error.message);
  }
}
