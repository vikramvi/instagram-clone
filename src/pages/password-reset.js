import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function PasswordReset() {
    return (

        <div className="bg-gray-100 min-h-screen  w-full flex justify-center items-center"> { /* outermost container */}
            { /* WHY THIS ADDITIONAL CONTAINER NEEDED ?? */}
            {/* <div className="w-full flex justify-center items-center"> */}
            { /* container for center part of screen */}
            <div className="flex flex-col max-w-sm border border-gray-500 bg-white sm:mt-8 mt-2 rounded text-gray-500">
                { /*  container for middle section elements except button */}
                <div className="flex flex-col justify-center items-center sm:p-11 py-8 px-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-24 h-24 text-red-400 border-4 border-green-600 rounded-full p-3"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    <p className="font-semibold mt-5">
                        Trouble Logging In?
                        </p>
                    <p className="text-sm text-gray-base text-center mt-3 mx-5">
                        Enter your account email address and we'll send you a link to get
                        back into your account.
                        </p>
                    <form className="w-full">
                        <input
                            placeholder="Email address"
                            className="w-full border border-grey-400 px-2.5 py-1.5 mt-4"
                        />
                        <button
                            className="w-full bg-blue-400 text-white mt-4 px-4 text-sm h-8 uppercase font-semibold rounded"
                        >
                            Send Login Link
                            </button>
                    </form>
                    <div
                        className="border-b border-gray-500 w-full flex justify-center mt-4"
                    >
                        <p className="transform translate-y-2 px-5 uppercase bg-white max-w-max text-xs text-gray-400 font-semibold">
                            or
                            </p>
                    </div>
                </div>
                <Link
                    to={ROUTES.LOGIN}
                    className="w-full text-center text-sm text-gray-base font-semibold border-t border-gray-primary bg-gray-background py-3 mt-6"
                >
                    Back To Login
                    </Link>
            </div>
            {/* </div> */}
        </div>
    )
}