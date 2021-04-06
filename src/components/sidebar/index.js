import { useContext } from "react";

import LoggedInUserContext from "../../context/logged-in-user";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

export default function Sidebar() {
    const {
        user: { docId = "", fullName, username, userId, following } = {}
    } = useContext(LoggedInUserContext);

    //console.log('Sidebar docId', docId);

    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
        </div>
    )
}