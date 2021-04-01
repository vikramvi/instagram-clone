import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user"
import { isUserFollowingProfile } from "../../services/firebase";

export default function Header({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        fullname,
        following = [],
        followers = [],
        username: profilUsername
    }
}) {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const activeBtnFollow = user.username && user.username !== profilUsername;

    const handleToggleFollow = () => {
        setIsFollowingProfile((isFollowingProfile) => { return !isFollowingProfile; });

        console.log("isFollowingProfile", isFollowingProfile);
        console.log("followers", followers);

        setFollowerCount({
            followerCount: isFollowingProfile ? followers.length - 1 : followers.length + 1
        })
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            //console.log("isFollowing", isFollowing);

            setIsFollowingProfile(isFollowing);
        }

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }

    }, [user.username, profileUserId]);

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                {user.username &&
                    (<img
                        className="rounded-full h-40 w-40 flex"
                        alt={`${profilUsername} profile picture`}
                        src={`/images/avatars/${profilUsername}.jpg`}
                    />)
                }
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profilUsername}</p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile ? "Unfollow" : "follow"}
                        </button>

                    )}
                </div>
            </div>
        </div>

    );
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        following: PropTypes.array,
        followers: PropTypes.array
    }).isRequired
};