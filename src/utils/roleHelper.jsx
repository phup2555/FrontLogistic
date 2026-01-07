import * as jwtDecode from "jwt-decode";

export const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decodedToken = jwtDecode.default(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.href = "/";
      return null;
    }

    return decodedToken.role || null;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.href = "/";
    return null;
  }
};

export const checkAdmin = () => {
  const role = getRoleFromToken();
  return role === "LogisAdminnn";
};

export function getUserIdByLocalStorage() {
  try {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return null;
    return user_id;
  } catch (error) {
    console.error("Invalid UserId:", error);
    return null;
  }
}
