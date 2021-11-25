import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
const queryClient = new QueryClient();
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const onSubmit = () => {
    alert("submit");
};

const Login = () => {
    return (
        <div className="App">
            <Form className="form">
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="example@example.com"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                    />
                </FormGroup>
                <Button onClick={onSubmit}>Submit</Button>
                <Router>
                    {" "}
                    <Link to="/core/dailytask">Home</Link>
                </Router>
            </Form>
        </div>
    );
};

export default Login;

if (document.getElementById("login")) {
    ReactDOM.render(<Login />, document.getElementById("login"));
}
