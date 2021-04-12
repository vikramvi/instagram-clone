import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

export default function Suggestions({ userId, following, loggedInUserDocId }) {
    //getSuggestedProfiles - firebase service
    //call the async function within useEffect
    //store it in a state
    //render within skeleton

    const [profiles, setProfiles] = useState(null);

    useEffect(() => {

        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            //console.log("response", response);

            setProfiles(response);
        }

        //console.log("suggestions userId", userId);

        if (userId) {
            suggestedProfiles();
            //console.log("suggestions profiles", profiles);
        }

    }, [userId]);

    //console.log("suggestions profiles", profiles);

    return (!profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            {/*console.log("profiles", profiles)*/}
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {
                    profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            spDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            userId={userId}
                            loggedInUserDocId={loggedInUserDocId}
                        />
                    ))
                }
            </div>
        </div>
    ) : null);
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
};