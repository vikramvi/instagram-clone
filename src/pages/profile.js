import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header"; //basic header applicable on all pages
import UserProfile from "../components/profile"; //user profile related header


export default function Profile() {
    const { username } = useParams();
    //console.log("username", username);
    const [userExists, setUserExists] = useState(false);
    const [user, setUser] = useState(null);

    const history = useHistory();

    useEffect(() => {
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            //console.log("user", user);

            if (user.length > 0) {
                setUser(user[0]);
                setUserExists(true);
            } else {
                setUserExists(false);
                history.push(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, history]);

    return userExists ? (
        <div className="by-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                {user.fullName}
                <UserProfile user={user} />
            </div>

        </div>
    ) : null;
}