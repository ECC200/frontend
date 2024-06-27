import { useState, useCallback } from 'react';
import { Global, css } from '@emotion/react'
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import Logofunc from '../LogoSetup';
import Axios from 'axios';


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
                <BackDiv>
                    <LoginBg>
                        <Logofunc />
                        <ResetPwMsg>人事部にお問い合わせください</ResetPwMsg>
                        <ResetPw onClick={HandlePwChangeMsg}>Login page</ResetPw>
                    </LoginBg>
                </BackDiv>
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
                <BackDiv>
                    <LoginBg>
                        <Logofunc />
                        {/* Error */}
                        {reqMsg === false ? (
                            <>
                                <ErrMsg>* Staff id か passwordが間違っています</ErrMsg>
                                <form onSubmit={handleSubmit}>
                                    <InputArea>
                                        <ErrInputName htmlFor='staffId'>スタッフID</ErrInputName>
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
                                    <SubmitBtn type="submit">Login</SubmitBtn>
                                </form>
                            </>
                        ) : (
                            // 普通
                            <form onSubmit={handleSubmit}>
                                <InputArea>
                                    <InputName htmlFor='staffId'>スタッフID:</InputName>
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
                                <SubmitBtn type="submit">ログイン</SubmitBtn>
                            </form>
                        )}
                        <ResetPw onClick={HandlePwChangeMsg}>パスワードを忘れた方はこちら</ResetPw>
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

`

const LoginBg = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 650px;
    margin-left:auto;
    margin-right:auto;
    margin-top:5%;
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
    margin: 5% auto;
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
    font-size: 12px;
    margin-top: 5%;
    letter-spacing: 0.5em;
    text-transform: uppercase;
`;
const ResetPwMsg = styled.p`
    color: #000;
    font-size:25px;
    margin: 15% 3%;
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
