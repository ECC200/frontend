import { useState, useCallback } from 'react'
import { Global, css } from '@emotion/react'
import { useNavigate, useLocation } from "react-router-dom";
import { Axios } from 'axios';
import styled from '@emotion/styled';
import Logofunc from '../LogoSetup';

import {
    InputLabelBlack, InputBar, InputArea, ErrInputLabel, ErrInputBar
} from './EmotionForWeb'


function WebStaffReLogin() {
    const IpAddress = '54.226.61.199:8080'

    const navigate = useNavigate();
    const location = useLocation();
    const { FullName, StaffID } = location.state;
    const [password, setPassword] = useState('');
    const [reqMsg, setReqMsg] = useState(true);

    // Staff Data
    const handleTakeData = async () => {
        try {
            // const response = await Axios.get(`localhost:8080`, {
            const response = await Axios.get(`${IpAddress}`, {
                StaffId: StaffID,
            });
            navigate("/webStaffData/", { state: response.data });
        } catch (error) {
            console.error(error);
        }
    };
    // Login
    const handleLogin = async () => {
        try {
            // const response = await Axios.post('localhost:8080', {
            const response = await Axios.post(`${IpAddress}`, {
                StaffId: StaffID,
                Password: password
            });
            switch (response.statusCode !== 200) {
                case 200:
                    handleTakeData()
                    break
                default:
                    setReqMsg(false)
                    break
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 改めてログイン
    const handlePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin()
    };

    return (
        <>
            <Global
                styles={css`
                    body{
                        background-color: #fff;
                    }
                `}
            />
            <BackDiv>
                <LoginBg>
                    <Logofunc />
                    <form onSubmit={handleSubmit}>
                        <InputArea>
                            <StaffName>~{FullName} ようこそ~</StaffName>
                        </InputArea>
                        {reqMsg ? (
                            <InputArea>
                                <InputLabelBlack htmlFor='password'>パスワード:</InputLabelBlack>
                                <InputBar
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePassword}
                                />
                            </InputArea>
                        ) : (
                            <InputArea>
                                <ErrInputLabel htmlFor='password'>パスワード:</ErrInputLabel>
                                <ErrInputBar
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePassword}
                                />
                            </InputArea>
                        )}
                        <SubmitBtn type="submit">ログイン</SubmitBtn>
                    </form>
                    <RetureToLogin onClick={() => navigate("/webLogin/")}>ログイン画面へ遷移</RetureToLogin>
                </LoginBg>
            </BackDiv>
        </>
    );
}

export default WebStaffReLogin;





const BackDiv = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`

const LoginBg = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 675px;
    margin:5% auto 0 auto;
    border: 2px solid #000;
    border-radius: 25px;
    padding: 3% 0;
`;

const StaffName = styled.h2`
    text-align: center;
    margin: 20px 0;
    letter-spacing: 5px;

`

const SubmitBtn = styled.button`
    border: 1px solid #000;
    border-radius: 7px;
    background-color: transparent;
    color: #000;
    font-size: 14px;
    letter-spacing: 5px;
    display: flex;
    margin: 5% auto;
    padding: 1.5% 3.5%;
    text-transform: uppercase;
`;

const RetureToLogin = styled.button`
    border: none;
    background-color: transparent;
    color: #000;
    font-size: 14px;
    margin-top: 10%;
    letter-spacing: 0.5em;
    text-transform: uppercase;
`;
