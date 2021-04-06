import { useState, useEffect, useContext } from "react";
import { getUserByUserId } from '../services/firebase';
import UserContext from "../context/user";

export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState({});
    //const { user } = useContext(UserContext)
    //console.log("user", user);

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            const [user] = await getUserByUserId(userId);
            setActiveUser(user || {});
        }

        //console.log("userId", userId);

        if (userId) {
            getUserObjByUserId(userId);
        }

    }, [userId]);


    return { user: activeUser };
}