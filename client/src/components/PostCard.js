import React from "react";
import { Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";

function PostCard({
    post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <p>Buttons To be added here</p>
            </Card.Content>
        </Card>
    );
}

export default PostCard;
