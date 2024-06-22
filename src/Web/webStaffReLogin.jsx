import { useState, useCallback } from 'react'
import { Global, css } from '@emotion/react'
import { useNavigate, useLocation } from "react-router-dom";

import styled from '@emotion/styled';
import Logofunc from '../LogoSetup';


function WebStaffReLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const { FullName, StaffID } = location.state;
    const [password, setPassword] = useState('');

    console.log(StaffID)

    // 改めてログイン
    const handlePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Password:', password);
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
                            <InputName>{FullName}</InputName>
                        </InputArea>

                        <InputArea>
                            <InputName htmlFor='password'>パスワード:</InputName>
                            <InputBar
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePassword}
                            />
                        </InputArea>
                        <SubmitBtn type="submit">ログイン</SubmitBtn>
                    </form>
                    <ResetPw onClick={() => navigate("/webLogin/")}>ログイン画面へ遷移</ResetPw>
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