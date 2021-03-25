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

export async function getUserByUserId(userId) {
    const result = await firebase.
        firestore().
        collection('users').
        where('userId', '==', userId).get();
    //console.log("firebase result", result);

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    //  console.log("firebase user", user);

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
