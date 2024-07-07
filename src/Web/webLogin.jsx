import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import Logofunc from '../LogoSetup';
import { Global, css } from '@emotion/react';

function WebLogin() {
    const [resetpw, setResetPW] = useState(false);
    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');
    const [reqMsg, setReqMsg] = useState(true);
    const navigate = useNavigate();

    const handleStaffIdChange = useCallback((e) => {
        setStaffId(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/login", {
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
                <Container>
                    <LoginBg>
                        <Logofunc />
                        <ResetPwMsg>ITの同僚に連絡してください。</ResetPwMsg>
                        <ResetPw onClick={handlePwChangeMsg}>Login page</ResetPw>

                    </LoginBg>
                </Container>
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
                <Container>
                    <LoginBg>
                        <Logofunc />
                        {reqMsg === false ? (
                            <>
                                <ErrMsg>*従業員番号またはパスワードが正しくありません*</ErrMsg>
                                <InputArea>
                                    <ErrInputName htmlFor='staffId'>従業員番号:</ErrInputName>
                                    <ErrInputBar
                                        type="text"
                                        id="staffId"
                                        value={staffId}
                                        onChange={handleStaffIdChange}
                                    />
                                </InputArea>
                                <InputArea>
                                    <ErrInputName htmlFor='password'>パスワード:</ErrInputName>
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
                                    <InputLabelBlack htmlFor='staffId'>スタッフID:</InputLabelBlack>
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
                </Container>
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
    height: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5%;

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
    margin: 4% auto;
    letter-spacing: 5px;
`;

const InputName = styled.label`
    color: #000;
    font-size: 18px;
`;

const ErrInputName = styled.label`
    color: red;
    font-size: 18px;
`;

const InputBar = styled.input`
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 10px;
    color: #000;
    padding-left: 3%;
    font-size: 14px;
    height: 50px;
    :hover {
        background-color: hsl(0 0% 85%);
    }
`;

const ErrInputBar = styled.input`
    background-color: #fff;
    border: 1px solid red;
    border-radius: 10px;
    color: #000;
    padding-left: 3%;
    font-size: 14px;
    height: 50px;
    :hover {
        background-color: hsl(0 0% 85%);
    }
`;

const SubmitBtn = styled.button`
    border: 1px solid #000;
    color: #000;
    margin: 0 auto;
    display: flex;
    ${SubmitBtnPattern}
`;

const ResetPw = styled.button`
    border: none;
    background-color: transparent;
    color: #000;
    margin-top: 50px;
    font-size: 12px;
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

const ErrMsg = styled.p`
    color: red;
    font-size: 18px;
    letter-spacing: 3px;
    text-align: center;
    margin: 0;
`;
