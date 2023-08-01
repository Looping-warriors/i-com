import { Input, PasswordInput } from "@mantine/core";
import { IconLock, IconUserCircle } from "@tabler/icons-react";
import { styled } from "styled-components";
import { useAuth } from "../context/auth";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import {AiFillExclamationCircle} from "react-icons/ai"
const Login = ({ close }) => {
    const auth = useAuth();
    const [log, setLog] = useState({ username: "", password: "" });
    // const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5010/auth/login", log)
            .then((res) => {
                auth.login(res.data.userName);
                setLog({ username: "", password: "" });
                close(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input
                    icon={<IconUserCircle />}
                    placeholder="Your UserName"
                    radius="md"
                    value={log.username}
                    onChange={(e) => {
                        setLog({ ...log, username: e.target.value });
                    }}
                />
                <PasswordInput
                    label="Your password"
                    placeholder="Your password"
                    icon={<IconLock size="1rem" />}
                    value={log.password}
                    onChange={(e) => {
                        setLog({ ...log, password: e.target.value });
                    }}
                />
                <LoginBtn
                    type="submit"
                    onClick={() =>
                        notifications.show({
                            title: "Login Failed",
                            message: "Please check your username and password",
                            color: 'red',
                            icon: <AiFillExclamationCircle color="white" size="3rem" />,
                            // styles: (theme) => ({
                            //   root: {
                                // backgroundColor: theme.colors.blue[6],
                                // borderColor: theme.colors.blue[6],
                
                                // '&::before': { backgroundColor: theme.white },
                              // },
                
                              // title: { color: theme.white },
                              // description: { color: theme.white },
                              // closeButton: {
                              //   color: theme.white,
                              //   '&:hover': { backgroundColor: theme.colors.blue[7] },
                              // },
                            // }),
                        })
                    }
                >
                    Login
                </LoginBtn>
            </Form>
        </Container>
    );
};

export default Login;

const Container = styled.div`
    /* margin-top: 20px; */
    /* border: 1px solid red; */
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    input {
        padding: 0.5rem;
    }
`;
const LoginBtn = styled.button`
    padding: 0.6rem;
    color: white;
    background-color: #3939f4;
    border: none;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;
