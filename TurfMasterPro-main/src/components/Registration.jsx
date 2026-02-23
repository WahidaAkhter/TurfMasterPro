import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        const payload = {
            fullName: data.name,
            email: data.email,
            password: data.password,
            gender: data.gender,
            mobileNumber: data.mobile,
            dateOfBirth: data.dob
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/user",
                payload
            );
            if (response.data) {
                alert("Registration Successful!");
                navigate("/login");

            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }

    };

    const password = watch("password");

    return (
        <div className="">

            {/* Form */}
            <div className="flex items-center lg:p-12 p-8 bg-[#0C172C] h-full">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto">

                    <div className="mb-12">
                        <h1 className="text-3xl font-semibold text-purple-400">Create an account</h1>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="text-white text-xs block mb-2">Full Name</label>
                        <input
                            {...register("name", {
                                required: "Full name is required",
                                maxLength: { value: 30, message: "Max 30 characters allowed" }
                            })}
                            className="w-full bg-transparent text-sm text-white border-b border-slate-500 
                  focus:border-white pl-2 pr-8 py-3 outline-none"
                            placeholder="Enter name"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mt-8">
                        <label className="text-white text-xs block mb-2">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className="w-full bg-transparent text-sm text-white border-b border-slate-500 
                  focus:border-white pl-2 pr-8 py-3 outline-none"
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mt-8">
                        <label className="text-white text-xs block mb-2">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "At least 8 characters required" },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,25}$/,
                                    message: "Must include 1 uppercase, 1 number, and 1 special character"
                                }
                            })}
                            type="password"
                            className="w-full bg-transparent text-sm text-white border-b border-slate-500 
                  focus:border-white pl-2 pr-8 py-3 outline-none"
                            placeholder="Enter password"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>


                    {/* Confirm Password */}
                    <div className="mt-8">
                        <label className="text-white text-xs block mb-2">Confirm Password</label>
                        <input
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            type="password"
                            className="w-full bg-transparent text-sm text-white border-b border-slate-500 focus:border-white pl-2 pr-8 py-3 outline-none"
                            placeholder="Confirm password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="mt-8">
                        <label className="text-white text-xs block mb-3">Gender</label>
                        <div className="flex items-center gap-6">
                            {/* Male */}
                            <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
                                <input
                                    type="radio"
                                    value="Male"
                                    {...register("gender", { required: "Gender is required" })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-600">Male</span>
                            </label>

                            {/* Female */}
                            <label className="flex items-center gap-2 cursor-pointer hover:text-pink-600 transition">
                                <input
                                    type="radio"
                                    value="Female"
                                    {...register("gender", { required: "Gender is required" })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-600">Female</span>
                            </label>

                            {/* Other */}
                            <label className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition">
                                <input
                                    type="radio"
                                    value="Other"
                                    {...register("gender", { required: "Gender is required" })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-600">Other</span>
                            </label>
                        </div>

                        {/* Error Message */}
                        {errors.gender && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.gender.message}
                            </p>
                        )}
                    </div>

                    <div className="mt-8">
                        <label className="text-white text-xs block mb-2">Mobile Number</label>

                        <input
                            {...register("mobile", {
                                required: "Mobile number is required",
                                pattern: {
                                    value: /^(?:\+8801|01)[3-9]\d{8}$/,
                                    message: "Enter a valid mobile number (e.g. 01XXXXXXXXX)"
                                }
                            })}
                            type="tel"
                            className="w-full bg-transparent text-sm text-white border-b border-slate-500
                   focus:border-white pl-2 pr-8 py-3 outline-none"
                            placeholder="Enter mobile number"
                        />

                        {errors.mobile && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.mobile.message}
                            </p>
                        )}
                    </div>

                    <div className="mt-8">
                        <label className="text-white text-xs block mb-2">Date of Birth</label>
                        <input
                            {...register("dob", {
                                required: "Date of birth is required"
                            })}
                            type="date"
                            className="w-full bg-transparent text-sm text-white border-b border-slate-500 focus:border-white pl-2 pr-8 py-3 outline-none" />

                        {errors.dob && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.dob.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-max shadow-xl py-3 px-6 min-w-32 text-sm text-white font-medium rounded-sm bg-purple-600 hover:bg-purple-500"
                        >
                            Register
                        </button>

                        <p className="text-sm text-slate-300 mt-8">
                            Already have an account?{" "}
                            <Link to="/login" className="text-purple-400 font-medium hover:underline ml-1">
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;