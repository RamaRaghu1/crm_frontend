import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLogInMutation } from "../redux/features/api/auth/authApi.js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { toast } from "react-hot-toast";
const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [logIn, { isSuccess, error, data, isLoading }] = useLogInMutation();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email!")
      .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await logIn({ email, password });
    },
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (isSuccess && data.success == true) {
      toast.success(data.message);
      // refetch();
      navigate("/", { replace: true });
    }

    if (error) {
      const errorMessage = error;
      toast.error(errorMessage?.data?.message);
    }
  }, [isSuccess, data, error]);

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div>
      <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Welcome Back!
            </h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Login to your account
            </p>
          </div>

          <div class="relative max-w-md mx-auto mt-8 md:mt-16">
            <div class="overflow-hidden bg-white rounded-md shadow-md">
              <div class="px-4 py-6 sm:px-8 sm:py-7">
                <form onSubmit={handleSubmit}>
                  <div class="space-y-5">
                    <div>
                      <label for="" class="text-base font-medium text-gray-900">
                        {" "}
                        Email address{" "}
                      </label>
                      <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </div>

                        <input
                          type="email"
                          name="email"
                          id=""
                          onChange={handleChange}
                          value={values.email}
                          placeholder="Enter email to get started"
                          class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                        {errors.email && touched.email && (
                          <span className="text-red-500 font-medium">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div class="flex items-center justify-between">
                        <label
                          for=""
                          class="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Password{" "}
                        </label>

                        {/* <a
                          href="#"
                          title=""
                          class="text-sm font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus:text-orange-600 hover:underline"
                        >
                          {" "}
                          Forgot password?{" "}
                        </a> */}
                      </div>
                      <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            />
                          </svg>
                        </div>

                        <input
                          type={!show ? "password" : "text"}
                          name="password"
                          id=""
                          onChange={handleChange}
                          value={values.password}
                          placeholder="Enter your password"
                          class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                        {!show ? (
                          <AiOutlineEyeInvisible
                            className="absolute bottom-4 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(true)}
                          />
                        ) : (
                          <AiOutlineEye
                            className="absolute bottom-4 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(false)}
                          />
                        )}
                        {errors.password && touched.password && (
                          <span className="text-red-500 font-medium">
                            {errors.password}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                      >
                        Log in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
