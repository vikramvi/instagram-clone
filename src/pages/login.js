import { useHistory, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import LoginFooter from "../components/loginFooter";

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
                            <div className="w-full box-border flex flex-row text-sm p-0 mx-10 mt-2.5 mb-5 relative">
                                <div className="flex flex-col flex-grow	flex-shrink	 relative top-1.5 h-0 box-border  top-1.5  border border-solid border-black align-baseline p-0  w-full"></div>
                                <div className="flex flex-col flex-grow-0 flex-shrink-0 relative mx-5 text-xs align-baseline p-0">OR</div>
                                <div className="flex flex-col flex-grow	flex-shrink	 relative   top-1.5 h-0 border border-solid border-black align-baseline p-0  w-full"></div>
                            </div>
                            <Link
                                className="text-center leading-3 text-xs text-indigo-600"
                                to={ROUTES.PASSWORD_RESET}
                            >
                                Forgot Password ?
                            </Link>


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
            { /* Footer Component */}
            <LoginFooter />
        </section>
    );
};