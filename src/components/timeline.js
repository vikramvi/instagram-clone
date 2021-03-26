import skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";

export default function Timeline() {
    //we need to get the logged in user's photos ( hook )
    const { photos } = usePhotos();
    console.log("photos", photos);
    //on loading the photos, we need to use react skeleton
    //if we have photos render them ( create a post component )
    //if the user has no photos, tell them to create some photos

    return (
        <div className="container col-span-2">
            <p>I am the timeline</p>
        </div>
    )
}