import { useHistory, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUserNameExists } from "../services/firebase";
import LoginFooter from "../components/loginFooter";

export default function SignUp() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async (event) => {
        event.preventDefault();

        const userNameExists = await doesUserNameExists(userName);

        //console.log(userNameExists);

        if (!userNameExists.length) {
            try {

                //firebase auth method 
                //https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                // authentication
                // -> emailAddress & password & username (displayName)
                // https://firebase.google.com/docs/auth/web/manage-users
                // Update a user's profile
                await createdUserResult.user.updateProfile({
                    displayName: userName
                });

                // firebase user collection (create a document)
                //https://firebase.google.com/docs/firestore/manage-data/add-data#web-v8_8
                // Add a new document with a generated id.
                await firebase
                    .firestore()
                    .collection('users')
                    .add({
                        userId: createdUserResult.user.uid,
                        username: userName.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: ["2"],
                        followers: [],
                        dateCreated: Date.now()
                    });

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                //reset input fields
                setUserName('');
                setFullName('');
                setEmailAddress('');
                setPassword('');

                //set error value
                setError(error.message);
            }
        } else {
            setUserName('');
            setError('That username is already taken, please try another.');
        }

    };

    useEffect(() => {
        document.title = 'Sign Up - Instagram';
    }, []);

    return (
        <section className="flex flex-col items-stretch flex-grow flex-shrink-0 relative">
            <main className="flex flex-col">
                <div className="container flex mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
                    <div className="hidden lg:flex w-full lg:w-3/5">
                        <img
                            src="/images/iphone-with-profile.jpg"
                            alt="iPhone with Instagram app"
                            className="object-scale-down"
                        />
                    </div>
                    <div className="flex flex-col w-full lg:w-2/5 justify-center h-full max-w-md m-auto">
                        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">

                            <h1 className="flex justify-center w-full">
                                <img src="/images/logo.png" alt="instagram" className="mt-2 mb-4 w-6/12" />
                            </h1>

                            <button className="flex justify-center w-full bg-blue-400 mx-10 my-2 text-sm text-white px-2 py-1.5">
                                Log in with Facebook
                            </button>

                            <div className="flex justify-center items-center w-full mt-4 mb-4">
                                <div className="flex-grow h-0.5 border"></div>
                                <div className="text-center mx-3.5 my-0 flex-grow-0 text-sm font-semibold"> OR </div>
                                <div className="flex-grow h-0.5 border"></div>
                            </div>

                            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                            <form onSubmit={handleSignUp} method="POST">
                                <input
                                    aria-label="Enter your User Name"
                                    type="text"
                                    placeholder="Username"
                                    required
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                    onChange={({ target }) => { setUserName(target.value) }}
                                    value={userName}
                                />
                                <input
                                    aria-label="Enter your Full Name"
                                    type="text"
                                    placeholder="Full name"
                                    required
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                    onChange={({ target }) => { setFullName(target.value) }}
                                    value={fullName}
                                />
                                <input
                                    aria-label="Enter your email address"
                                    type="email"
                                    size="40"
                                    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                    required
                                    placeholder="Email address"
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                    onChange={({ target }) => { setEmailAddress(target.value) }}
                                    value={emailAddress}
                                />
                                <input
                                    aria-label="Enter your password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                    onChange={({ target }) => { setPassword(target.value) }}
                                    value={password}
                                    minlength="6"
                                    maxlength="15"
                                />
                                <button
                                    disabled={isInvalid}
                                    type="submit"
                                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                                    ${isInvalid && 'opacity-50'}`}
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary mb-4">
                            <p className="text-sm">
                                Have an account?{` `}
                                <Link
                                    to={ROUTES.LOGIN}
                                    className="font-bold text-blue-medium"
                                    data-testid="login"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            <p className="text-sm my-2.5 mx-5">
                                Get the app.
                            </p>
                            <div className="flex flex-row w-full justify-center items-center my-2.5">
                                <a
                                    href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mr-2"
                                >
                                    <img
                                        src="/images/AppStore.png"
                                        className="h-10"
                                    />
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DAC8B5777-4DDC-4F46-8F5C-CC3B64CFAF03%26utm_content%3Dlo%26utm_medium%3Dbadge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="/images/GooglePlay.png"
                                        className="h-10"
                                    />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            { /* Footer Component */}
            <LoginFooter />
        </section>
    );
};