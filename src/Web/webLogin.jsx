import styled from '@emotion/styled'
import Logofunc from '../LogoSetup'
function webLogin() {

    const LoginBg = styled.div`
        display: flex;
        flex-direction: column;
        width: 30%;
        margin-left:auto;
        margin-right:auto;
        border:2px solid #000;
        border-radius: 25px;
        background-color: #fff;
    `
    const InputArea = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width:65%;
        margin: 2% auto;
        letter-spacing:5px;
    `
    const InputName = styled.label`
        color: #000;
        font-size:120%;
    `
    const InputBar = styled.input`
        background-color: #fff;
        border: 1px solid #000;
        border-radius:10px;
        color: #000;
        height:50px;
        :hover{
            background-color: hsl(0 0% 85%);
        }
    `
    const SubmitBtn = styled.button`
        border:1px solid #000;
        background-color: transparent;
        color: #000;
        font-size: 120%;
        letter-spacing:5px;
        margin: 5% auto;
        padding:1.5% 3.5%;
        text-transform: uppercase;
        width:20%;
    `
    const ResetPw = styled.button`
        border:none;
        color: #000;
        background-color: transparent;
        text-transform: uppercase;
        font-size: 120%;
        letter-spacing:0.5em;
    `


    return (
        <>
            <LoginBg>
                <Logofunc />
                {/* Staff No */}
                <InputArea>
                    <InputName htmlFor="">従業員の番号:</InputName>
                    <InputBar type="text" name="staffId" />
                </InputArea>
                {/* Password */}
                <InputArea>
                    <InputName htmlFor="">パスワード:</InputName>
                    <InputBar type="password" name="password" />
                </InputArea>
                {/* Submit */}
                <SubmitBtn>login</SubmitBtn>
                <ResetPw>Password Reset?</ResetPw>
            </LoginBg>
        </>
    );
}
export default webLogin;