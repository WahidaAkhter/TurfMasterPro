import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      // Save logged-in user (single object)
      localStorage.setItem("user", JSON.stringify(response.data));
      // In Login.js
     window.dispatchEvent(new Event("userLogin"));
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="grid lg:grid-cols-5 md:grid-cols-2 items-center gap-y-4 h-full">

        {/* LEFT IMAGE */}
        <div className="max-md:order-1 lg:col-span-3 md:h-screen w-full bg-[#000842] md:rounded-tr-xl md:rounded-br-xl lg:p-12 p-8">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:w-2/3 w-full h-full object-contain block mx-auto"
            alt="login"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="lg:col-span-2 w-full p-8 max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-slate-900 text-3xl font-bold">Sign in</h1>
            <p className="text-[15px] mt-6 text-slate-600">
              Don&apos;t have an account?
              <Link
                to="/registration"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </div>

          {/* BACKEND ERROR MESSAGE */}
          {errorMessage && (
            <p className="text-red-600 mb-4">{errorMessage}</p>
          )}

          <div className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="text-[15px] font-medium">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full mt-2 px-4 py-3 rounded-md border"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-[15px] font-medium">Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full mt-2 px-4 py-3 rounded-md border"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-5 text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
