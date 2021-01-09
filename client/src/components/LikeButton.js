import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";

import ButtonPopup from "../utils/Popup";

function LikeButton({ user, post: { id, likeCount, likes } }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    });

    const likeButton = user ? (
        liked ? (
            <Button color="pink">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="pink" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="pink" basic>
            <Icon name="heart" />
        </Button>
    );

    return (
        <ButtonPopup content="Like post">
            <Button as="div" labelPosition="right" onClick={likePost}>
                {likeButton}
                <Label basic color="pink" pointing="left">
                    {likeCount}
                </Label>
            </Button>
        </ButtonPopup>
    );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;
