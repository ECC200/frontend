import { useState, useCallback } from 'react';
import { Global, css } from '@emotion/react'
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import Logo from '../LogoSetup';
import Axios from 'axios';
import {
    // Container
    Container,
    // button
    SubmitBtnPattern,
    // input
    InputLabelBlack, InputBar,
    // Err
    ErrInputLabel, ErrInputBar
} from './EmotionForWeb'

function WebLogin() {
    const navigate = useNavigate();
    const [resetpw, setResetPW] = useState(false);
    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');
    const [reqMsg, setReqMsg] = useState(true);

    const handleStaffIdChange = useCallback((e) => {
        setStaffId(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin()
    };

    // Staff Data
    const handleTakeData = async () => {
        try {
            const response = await Axios.get('localhost:8080', {
                StaffId: staffId,
            });
            navigate("/webStaffData/", { state: response.data });
        } catch (error) {
            console.error(error);
        }
    };

    // Login
    const handleLogin = async () => {
        try {
            const response = await Axios.post('localhost:8080', {
                StaffId: staffId,
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

    const HandlePwChangeMsg = () => {
        setResetPW(resetpw => !resetpw);
    }


    if (resetpw) {
        // パスワード再設定
        return (
            <>
                <Global
                    styles={css`
                        body{
                            background-color: #fff;
                        }
                    `}
                />
                <Container>
                    <LoginBg>
                        <Logo />
                        <ResetPwMsg>人事部にお問い合わせください</ResetPwMsg>
                        <ResetPw onClick={HandlePwChangeMsg}>Login page</ResetPw>
                    </LoginBg>
                </Container>
            </>
        );
    } else {
        // 普通
        return (
            <>
                <Global
                    styles={css`
                        body{
                            background-color: #fff;
                        }
                    `}
                />
                <Container>
                    <LoginBg>
                        <Logo />
                        {/* Error */}
                        {reqMsg === false ? (
                            <>
                                <ErrMsg>* Staff id か passwordが間違っています</ErrMsg>
                                <form onSubmit={handleSubmit}>
                                    <InputArea>
                                        <ErrInputLabel htmlFor='staffId'>スタッフID</ErrInputLabel>
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
                                    <SubmitBtn type="submit">Login</SubmitBtn>
                                </form>
                            </>
                        ) : (
                            // 普通
                            <form onSubmit={handleSubmit}>
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
                                <SubmitBtn type="submit">ログイン</SubmitBtn>
                            </form>
                        )}
                        <ResetPw onClick={HandlePwChangeMsg}>パスワードを忘れた方はこちら</ResetPw>
                    </LoginBg>
                </Container>
            </>
        );
    }
}

export default WebLogin;


const LoginBg = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 700px;
    margin:5% auto 0 auto;
    border: 2px solid #000;
    border-radius: 25px;
    background-color: #fff;
    padding: 3% 0;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 85%;
    height: 70px;
    margin: 5% auto;
    letter-spacing: 5px;
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
    font-size: 12px;
    margin-top: 15%;
    letter-spacing: 0.5em;
    text-transform: uppercase;
`;
const ResetPwMsg = styled.p`
    color: #000;
    font-size:25px;
    margin: 20% 3%;
    letter-spacing: 1.5px;
    text-align: center;
    text-transform: uppercase;
`
const ErrMsg = styled.p`
    color:red;
    font-size:18px;
    letter-spacing: 3px;
    text-align: center;
    margin:0;
    
`
