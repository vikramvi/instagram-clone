import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";

export default function Post({ content }) {
    //console.log("content", content);
    //Components - header, image, actions ( like & comment icons), footer, comments
    return <Header username={content.username} />;
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreate: PropTypes.number.isRequired
    })
}