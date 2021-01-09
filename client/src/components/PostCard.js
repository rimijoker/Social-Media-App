import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function PostCard({
    post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                    <Button color="orange" basic>
                        <Icon name="comment" />
                    </Button>
                    <Label as="a" color="orange" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    );
}

export default PostCard;
