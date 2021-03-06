import { firebase, FieldValue } from "../lib/firebase";

export async function doesUserNameExists(username) {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    //console.log(result);

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    //console.log(result);

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
}

export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId).get();
    //console.log("firebase result", result);

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    //console.log("firebase user", user);

    return user;
}

export async function getSuggestedProfiles(userId, following) {

    const result = await firebase.firestore().collection('users').limit(10).get();

    //console.log("getSuggestedProfiles userId, following", userId, following);

    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

//updateLoggedInUserFollowing, updateFollowedUserFollowers

export async function updateLoggedInUserFollowing(
    loggedInUserDocId,      //currently logged in user's doc id
    profileId,              //the user which logged in user wants to follow
    isFollowingProfile      //Is logged in user already following this user ?
) {
    return firebase
        .firestore()
        .collection("users")
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    spDocId,
    loggedInUserDocId,
    isFollowingProfile
) {
    return firebase
        .firestore()
        .collection("users")
        .doc(spDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
        });
}

export async function getPhotos(userId, following) {
    const result = await firebase
        .firestore()
        .collection("photos")
        .where("userId", "in", following)
        .get();


    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    //console.log("userFollowedPhotos", userFollowedPhotos);

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }

            const user = await getUserByUserId(photo.userId);

            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    );

    return photosWithUserDetails;
}

export async function getUserIdByUsername(username) {

}

export async function getUserPhotosByUsername(username) {
    const [user] = await getUserByUsername(username);
    //console.log("userId", userId);

    const result = await firebase
        .firestore()
        .collection("photos")
        .where("userId", "==", user.userId)
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", loggedInUserUsername)
        .where("following", "array-contains", profileUserId)
        .get();

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
    //console.log("response", response);

    return response.userId;
}

export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
) {
    // 1st param: karl's doc id
    // 2nd param: raphael's user id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)

    //console.log("activeUserDocId, profileUserId,  isFollowingProfile", activeUserDocId, profileUserId, isFollowingProfile);
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

    // 1st param: karl's user id
    // 2nd param: raphael's doc id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}


