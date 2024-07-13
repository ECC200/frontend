import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import Logofunc from '../LogoSetup';
import { Global, css } from '@emotion/react';

import {
    ErrInputLabel, InputLabelBlack, ErrInputBar, InputBar, InputArea, ErrMsg
} from './EmotionForWeb'

function WebLogin() {
    const [resetpw, setResetPW] = useState(false);
    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');
    const [reqMsg, setReqMsg] = useState(true);
    const navigate = useNavigate();
    const IpAddress = 'http://54.91.203.105:8080'


    const handleStaffIdChange = useCallback((e) => {
        setStaffId(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${IpAddress}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ staffId, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    navigate(`/webStaffData/${staffId}`);
                } else {
                    setReqMsg(false);
                }
            } else {
                setReqMsg(false);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setReqMsg(false);
        }
    };

    useEffect(() => {
        setReqMsg(true);
    }, []);

    const handlePwChangeMsg = () => {
        setResetPW(resetpw => !resetpw);
    };

    if (resetpw) {
        return (
            <>
                <Global
                    styles={css`
                        body {
                            background-color: #fff;
                        }
                    `}
                />
                <BackDiv>
                    <LoginBg>
                        <Logofunc />
                        <ResetPwMsg>ITの同僚に連絡してください。</ResetPwMsg>
                        <ResetPw onClick={handlePwChangeMsg}>ログイン画面へ遷移</ResetPw>
                    </LoginBg>
                </BackDiv>
            </>
        );
    } else {
        return (
            <>
                <Global
                    styles={css`
                        body {
                            background-color: #fff;
                        }
                    `}
                />
                <BackDiv>
                    <LoginBg>
                        <Logofunc />
                        {reqMsg === false ? (
                            <>
                                <ErrMsg>*従業員番号またはパスワードが正しくありません*</ErrMsg>
                                <InputArea>
                                    <ErrInputLabel htmlFor='staffId'>従業員番号:</ErrInputLabel>
                                    <ErrInputBar
                                        type="text"
                                        id="staffId"
                                        value={staffId}
                                        onChange={handleStaffIdChange}
                                    />
                                </InputArea>

                                <InputArea>
                                    <ErrInputLabel htmlFor='password'>パスワード:</ErrInputLabel>
                                    <ErrInputBar
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </InputArea>
                                <SubmitBtn onClick={handleLogin}>Login</SubmitBtn>
                            </>
                        ) : (
                            <>
                                <InputArea>
                                    <InputLabelBlack htmlFor='staffId'>従業員の番号:</InputLabelBlack>
                                    <InputBar
                                        type="text"
                                        id="staffId"
                                        value={staffId}
                                        onChange={handleStaffIdChange}
                                    />
                                </InputArea>
                                <InputArea>
                                    <InputLabelBlack htmlFor='password'>パスワード:</InputLabelBlack>
                                    <InputBar
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </InputArea>
                                <SubmitBtn onClick={handleLogin}>ログイン</SubmitBtn>
                            </>
                        )}
                        <ResetPw onClick={handlePwChangeMsg}>パスワードを忘れた方はこちら</ResetPw>
                    </LoginBg>
                </BackDiv>
            </>
        );
    }
}

export default WebLogin;

const BackDiv = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`;

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

const ResetPw = styled.button`
    border: none;
    background-color: transparent;
    color: #000;
    margin-top: 20px;
    font-size: 14px;
    letter-spacing: 0.5em;
    text-transform: uppercase;
`;

const ResetPwMsg = styled.p`
    color: #000;
    font-size: 25px;
    margin: 15% 3%;
    letter-spacing: 1.5px;
    text-align: center;
    text-transform: uppercase;
`;
