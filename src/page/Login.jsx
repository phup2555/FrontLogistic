import React, { useState } from "react";
import { LoginWeb } from "../service/Service";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setLogin_User] = useState("");
  const [password, setLogin_Pass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await LoginWeb({ username: email, password: password });
      console.log({ response });
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.result.username);
      localStorage.setItem("role", response.result.role);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.replace("/Dashboard");
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Something went wrong";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: backendMessage,
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      {/* Form */}
      <div className="w-full lg:w-1/3 bg-white p-6 sm:p-12 flex flex-col justify-center min-h-screen lg:min-h-0">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#928E85] py-2">
            Logistic
          </h1>
          <h3 className="text-lg sm:text-xl text-[#928E85] mt-6">Sign in</h3>
        </div>

        <div className="space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-2 text-base sm:text-lg font-medium text-[#928E85]"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
              onChange={(e) => setLogin_User(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 border border-[#7a776f] rounded-md outline-none focus:ring focus:ring-[#928E85]"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="text-base sm:text-lg font-medium text-[#928E85]"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password here"
                onChange={(e) => setLogin_Pass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full px-3 py-2 sm:py-3 border border-[#7a776f] rounded-md outline-none focus:ring focus:ring-[#928E85]"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🔒" : "🔓"}
              </button>
            </div>
          </div>

          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={`${
              isSubmitting
                ? "bg-[#aaa79e] cursor-not-allowed"
                : "bg-[#928E85] hover:bg-[#7a776f]"
            } w-full px-4 py-2 sm:py-3 text-white rounded-md flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                ກຳລັງເຂົ້າສູ່ລະບົບ...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </div>

      <div className="w-full lg:w-2/3 flex-1 min-h-screen lg:min-h-0">
        <img
          src="https://www.easywarehouse-thailand.com/wp-content/uploads/2024/01/pexels-tiger-lily-4483610_0-scaled.jpg"
          alt="Login Banner"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
    </div>
  );
};

export default Login;
