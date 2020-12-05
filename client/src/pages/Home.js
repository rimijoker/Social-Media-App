import React from "react";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

function Home() {
    const {
        loading,
        data: { getPosts: posts },
    } = useQuery(FETCH_POST_QUERY);

    if (posts) {
        console.log(posts);
    }
    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <h1>Recent Posts</h1>
            </Grid.Row>

            <Grid.Row>
                {loading ? (
                    <h1>Loading Posts...</h1>
                ) : (
                    posts &&
                    posts.map((post) => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POST_QUERY = gql`
    {
        getPosts {
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

export default Home;
