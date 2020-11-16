const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentResolvers = require("./comments");
const likeResolvers = require("./likes");

module.exports = {
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutations,
        ...likeResolvers.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription,
    },
};
