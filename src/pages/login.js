import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { useState, useEffect, useContext } from "react";
import * as ROUTES from "../constants/routes";

export default function Login() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();

        try {

            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);

            history.push(ROUTES.DASHBOARD);

        } catch (error) {
            setEmailAddress("");
            setPassword("");
            setError(error.message);
        }

    };

    useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);

    return (
        <section className="flex flex-col items-stretch flex-grow flex-shrink-0 relative">
            <main className="flex flex-col">
                <div className="container flex flex-row mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
                    <div className="hidden lg:flex w-5/5 lg:w-3/5   ">
                        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
                    </div>
                    <div className="flex flex-col w-full lg:w-2/5 justify-center h-full max-w-md m-auto">
                        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">

                            <h1 className="flex justify-center w-full">
                                <img src="/images/logo.png" alt="instagram" className="mt-2 mb-4 w-6/12" />
                            </h1>

                            {error &&
                                <p
                                    data-testid="error"
                                    className="mb-4 text-xs text-red-primary"
                                >
                                    {error}
                                </p>
                            }

                            <form onSubmit={handleLogin} method="POST" data-testid="login">
                                <input
                                    aria-label="Enter your email address"
                                    type="email"
                                    placeholder="Email address"
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                    onChange={({ target }) => { setEmailAddress(target.value) }}
                                    value={emailAddress}
                                />
                                <input
                                    aria-label="Enter your password"
                                    type="password"
                                    placeholder="Password"
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                    onChange={({ target }) => { setPassword(target.value) }}
                                    value={password}
                                />
                                <button
                                    disabled={isInvalid}
                                    type="submit"
                                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                                        ${isInvalid && 'opacity-50'} 
                                        ${isInvalid && "cursor-default"}
                                        `}
                                    name="name"
                                    value="value"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                            <p className="text-sm">
                                Don't have an account?{` `}
                                <Link
                                    to={ROUTES.SIGN_UP}
                                    className="font-bold text-blue-medium"
                                    data-testid="sign-up">
                                    Sign up
                        </Link>
                            </p>
                        </div>
                    </div>
                </div >
            </main>
            <footer className="flex flex-col items-stretch relative">
                <div className="flex flex-col items-stretch justify-start">
                    <div className="flex flex-col items-stretch content-evenly justify-start">
                        <div className="relative flex flex-row items-stretch justify-center flex-grow-0 flex-shrink-0">
                            <div className="flex flex-col justify-start mx-2 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">About</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Blog</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Jobs</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Help</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">API</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Privacy</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Terms</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Top Accounts</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Hashtags</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Locations</a>
                            </div>
                        </div>
                        <div className="relative flex flex-row items-stretch justify-center flex-grow-0 flex-shrink-0">
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Food & Drink</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Home & Garden</a>
                            </div>
                            <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Music</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row flex-auto relative justify-center my-1.5 items-stretch flex-grow-0 flex-shrink-0 my-3">
                    <div className="flex flex-col text-xs items-stretch block relative flex-shrink-0 leading-3">
                        <span className="inline-block relative">
                            <div className=" flex flex-row leading-none">
                                <span className="">
                                    English
                                </span>
                                <div className="ml-0.5">
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <select aria-label="Switch Display Language"
                                className="inline-block absolute opacity-0 inset-0">
                                <option value="de">Deutsch</option>
                                <option value="en">English</option>
                                <option value="en-gb">English (UK)</option>
                            </select>
                        </span>
                    </div>
                    <div className="text-xs ml-4">
                        © 2021 Instagram from Facebook
                    </div>
                </div>
            </footer>
        </section>
    );
};