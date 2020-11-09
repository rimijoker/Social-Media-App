const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

module.exports = {
    Mutation: {
        async register(
            _,
            { registerInput: { username, email, password, confirmPassword } }
        ) {
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "This username is taken",
                    },
                });
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            });

            const result = await newUser.save();

            const token = jwt.sign(
                {
                    id: result.id,
                    email: result.username,
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            return {
                ...result._doc,
                id: result._id,
                token,
            };
        },
    },
};
