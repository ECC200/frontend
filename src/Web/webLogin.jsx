import styled from '@emotion/styled'
import Logofunc from '../LogoSetup'
function webLogin() {

    const LoginBg = styled.div`
        margin-left:auto;
        margin-right:auto;
        border:2px solid #000;
        border-radius: 15%;
        background-color: #fff;
    `

    return (
        <>
            <LoginBg>
                <Logofunc />
            </LoginBg>
        </>
    );
}
export default webLogin;