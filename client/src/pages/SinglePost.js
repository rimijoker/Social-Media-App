import React, { useContext } from "react";
import gql from "graphql-tag";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import {
    Card,
    Grid,
    GridColumn,
    Image,
    Button,
    Icon,
    Label,
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        },
    });

    function deletePostCallback() {
        props.history.push("/");
    }

    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post...</p>;
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            commentCount,
            likeCount,
        } = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <GridColumn width={2}>
                        <Image
                            floated="right"
                            size="small"
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        />
                    </GridColumn>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton
                                    user={user}
                                    post={{ id, likeCount, likes }}
                                />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() =>
                                        console.log("Comment on Post")
                                    }
                                >
                                    <Button basic color="blue">
                                        <Icon name="comment" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton
                                        postId={id}
                                        callback={deletePostCallback}
                                    />
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    return postMarkup;
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default SinglePost;
