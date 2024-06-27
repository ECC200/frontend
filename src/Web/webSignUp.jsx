import styled from '@emotion/styled'
import Logofunc from '../LogoSetup'

function signUpTop() {
    const LoginBg = styled.div`
        display: flex;
        flex-direction: column;
        width: 30%;
        margin-left: auto;
        margin-right: auto;
        padding: 20vh;
        background-color: #fff;
    `
    const InputArea = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 65%;
        margin: 2% auto;
        letter-spacing: 5px;
    `
    const InputName = styled.label`
        color: #000;
        font-size: 120%;
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

    const DisplayArea = styled.div`
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 10px;
        color: #000;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 10px;
    `
    const SubmitBtn = styled.button`
        border: 1px solid #000;
        background-color: transparent;
        color: #000;
        font-size: 120%;
        letter-spacing: 5px;
        margin: 5% auto;
        padding: 1.5% 3%;
        text-transform: uppercase;
        width: 50%;
        white-space: nowrap;
        text-align: center;
        border-radius: 15px;
    `

    const staffId = "12345";

    return (
        <>
            <LoginBg>
                <Logofunc />
                {/* Staff ID */}
                <InputArea>
                    <InputName htmlFor="">スタッフID:</InputName>
                    <DisplayArea>{staffId}</DisplayArea>
                </InputArea>
                {/* Password */}
                <InputArea>
                    <InputName htmlFor="">パスワード:</InputName>
                    <InputBar type="password" name="password" />
                </InputArea>
                {/* Submit */}
                <SubmitBtn>新規登録</SubmitBtn>
            </LoginBg>
        </>
    );
}

export default signUpTop;