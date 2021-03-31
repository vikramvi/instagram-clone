import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";

//child components
import Header from "./header";

//firebase db calls
import { getUserPhotosByUsername } from "../../services/firebase";

export default function Profile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });

    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    };

    const [
        { profile, photosCollection, followerCount },
        dispatch
    ] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            //const [user] = await getUserByUsername(username);
            //console.log("user", user);

            const photos = await getUserPhotosByUsername(user.username);
            console.log("photos", photos);

            // dispatch({
            //     profile: user,
            //     photosCollection: photos,
            //     followerCount: user.followes.length
            // });
        }

        if (user.username) {
            getProfileInfoAndPhotos();
        }

    }, [user.username]);

    return (
        <>
            <Header />
            <p>Hello {user.username}</p>
        </>
    );

}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired
};