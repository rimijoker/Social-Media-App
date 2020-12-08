import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

function Register() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <Form onSubmit={onSubmit} noValidate>
                <h1>Register Page</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    value={values.email}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                ></Form.Input>
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Register;
