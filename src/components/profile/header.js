import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

import useUser from "../../hooks/use-user"
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import UserContext from "../../context/user";

export default function Header({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        fullName,
        following,
        followers,
        username: profileUsername
    }
}) {
    const { user: loggedInUser } = useContext(UserContext);
    //console.log("loggedInUser", loggedInUser);
    const { user } = useUser(loggedInUser?.uid);
    //console.log("user", user);

    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const activeBtnFollow = user?.username && user?.username !== profileUsername;

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => { return !isFollowingProfile; });

        //console.log("isFollowingProfile", isFollowingProfile);
        //console.log("followers", followers);

        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        })

        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            //console.log("isFollowing", isFollowing);

            setIsFollowingProfile(isFollowing);
        }

        if (user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }

    }, [user?.username, profileUserId]);

    //console.log("user", user);

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
                {profileUsername ?
                    (<img
                        className="rounded-full h-16 w-16 md:h-20 lg:h-40 md:w-20 lg:w-40 flex"
                        alt={`${profileUsername} profile picture`}
                        src={`/images/avatars/${profileUsername}.jpg`}
                    />) :
                    (<Skeleton count={1} duration={5} height={160} width={160} />)
                }
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">
                        {profileUsername === undefined ?
                            <Skeleton count={2} duration={10} height={30} width={75} /> :
                            profileUsername
                        }
                    </p>

                    {activeBtnFollow === undefined ?
                        <Skeleton count={2} duration={10} height={30} width={75} /> :
                        (
                            <button
                                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                onClick={handleToggleFollow}
                            >
                                {isFollowingProfile ? "Unfollow" : "follow"}
                            </button>
                        )}
                </div>
                <div className="container flex mt-4 flex-col lg:flex-row">
                    {followers === undefined || following === undefined ?
                        (<Skeleton count={1} width={677} height={24} />) :
                        (
                            <>
                                <p className="mr-10">
                                    <span className="font bold">{photosCount}</span> photos
                                </p>
                                <p className="mr-10">
                                    <span className="font bold">{followerCount}</span> {` `}
                                    {followerCount === 1 ? `follower` : `followers`}

                                </p>
                                <p className="mr-10">
                                    <span className="font bold">{following.length}</span> following
                                </p>
                            </>
                        )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
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