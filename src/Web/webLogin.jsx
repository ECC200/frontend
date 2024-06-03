import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import Logofunc from '../LogoSetup';
// import Axios from 'axios';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Navigate,
// } from "react-router-dom";

const LoginBg = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #000;
    border-radius: 25px;
    background-color: #fff;
    padding: 3% 0;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 65%;
    margin: 2% auto;
    letter-spacing: 5px;
`;

const InputName = styled.label`
    color: #000;
    font-size: 18px;
`;

const InputBar = styled.input`
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 10px;
    color: #000;
    height: 50px;
    font-size: 14px;
    :hover {
        background-color: hsl(0 0% 85%);
    }
`;

const SubmitBtn = styled.button`
    border: 1px solid #000;
    background-color: transparent;
    color: #000;
    font-size: 14px;
    letter-spacing: 5px;
    margin: 5% auto;
    padding: 1.5% 3.5%;
    text-transform: uppercase;
    text-align: center;
`;

const ResetPw = styled.button`
    border: none;
    background-color: transparent;
    color: #000;
    font-size: 14px;
    letter-spacing: 0.5em;
    text-transform: uppercase;
`;

function WebLogin() {
    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');


    const handleStaffIdChange = useCallback((e) => {
        setStaffId(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('StaffId:', staffId);
        console.log('Password:', password);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await Axios.get('');
                // <Route
                // path="/about"
                // element={ }
                // />
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <LoginBg>
            <Logofunc />
            <form onSubmit={handleSubmit}>
                <InputArea>
                    <InputName htmlFor='staffId'>従業員の番号:</InputName>
                    <InputBar
                        type="text"
                        id="staffId"
                        value={staffId}
                        onChange={handleStaffIdChange}
                    />
                </InputArea>
                <InputArea>
                    <InputName htmlFor='password'>パスワード:</InputName>
                    <InputBar
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </InputArea>
                <SubmitBtn type="submit">Login</SubmitBtn>
            </form>
            <ResetPw>Password Reset?</ResetPw>
        </LoginBg>
    );
}

export default WebLogin;
