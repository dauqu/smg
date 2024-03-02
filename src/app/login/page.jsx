"use client";
import Link from "next/link";
import Header from "../components/header";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default function page() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  async function handleLogin() {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set JSON content type header
          },
        }
      );

      setTimeout(() => {
        router.push(`/profile`, {
          scroll: false,
        });
      }, 2000);
      setTimeout(() => {
        setIsLoading(false);
        toast(response.data.message, {
          type: "success",
        });
      }, 1000);

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);

        toast(error?.response?.data?.message, {
          type: "error",
        });
      }, 1000);
    }
  }

  return (
    <div className="bg-[url('https://www.onlinebookbazar.com/assets/images/frontend/login/641554dacd4141679119578.png')] h-screen w-full">
      <Header />
      <section class="h-full flex sm:block justify-center items-center flex-col">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              class="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Flowbite
          </a> */}
          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <div class="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        checked
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-gray-500">
                        Remember me
                      </label>
                    </div>
                  </div>
                  {/* <Link
                    href="/register"
                    class="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </Link> */}
                </div>
                <button
                  class="w-full text-white bg-[#5671F5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleLogin}
                >
                  {isLoading ? "Loading..." : "Sign in"}
                </button>
                <p class="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/register"
                    class="font-medium text-primary-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
