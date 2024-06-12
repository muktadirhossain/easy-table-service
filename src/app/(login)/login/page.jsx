import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div>
            <Image
                className="blur-sm dark:backdrop-blur-sm -z-50"
                src="/bg-res.jpeg"
                alt="Background"
                quality={100}
                fill
                sizes="100vw"
                style={{
                    objectFit: "cover",
                }}
            />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-100/95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800/95 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-slate-300 text-center">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6 z-50" id="dashboard-login-form" >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email / Number
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email here..."
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type={'password'}
                                    name="password"
                                    id="password"

                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />

                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-red-600 dark:ring-offset-gray-800 cursor-pointer"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300 cursor-pointer"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <Link
                                    href={"/forgot-password"}
                                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* <AddIconButton className="w-full flex justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                                label="Login"
                                icon={false}
                            /> */}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don`t have an account yet?{" "}
                                <Link
                                    href={`/customer-registration`}
                                    className="font-medium text-red-600 hover:underline dark:text-blue-500"
                                >
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default page