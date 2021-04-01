import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header"; //basic header applicable on all pages
import UserProfile from "../components/profile"; //user profile related header


export default function Profile() {
    const { username } = useParams();
    //console.log("username", username);
    const [user, setUser] = useState(null);

    const history = useHistory();

    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username);
            //console.log("user", user);

            if (user.userId) {
                setUser(user);
            } else {
                history.push(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, history]);

    return user?.username ? (
        <div className="by-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>

        </div>
    ) : null;
}