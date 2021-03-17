import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { useState, useEffect, useContext } from "react";

export default function Login() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = () => { };

    useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <p className="font-bold">I am the login page</p>
        </div>
    );
};