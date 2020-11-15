const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentResolvers = require("./comments");

module.exports = {
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutations,
    },
};
