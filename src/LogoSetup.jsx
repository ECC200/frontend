import Logofile from './assets/logo.png'
import styled from '@emotion/styled'

function Logo() {
    const LogoArea = styled.div`
        display: grid;
        justify-content: center;
        align-items: center;
        padding: 5%;
        margin-left:auto;
        margin-right:auto;
    `
    const LogoImg = styled.img`
        width: 15%;
        margin: 0 auto;
        filter: drop-shadow(0 0 1px #000);
    `
    const LognName = styled.p`
        color: #000;
        font-size:150%;
        letter-spacing:5px;
        padding:0;
        margin: 0;
        text-align: center;
        text-transform: uppercase;
    `
    return (
        <LogoArea>
            <LogoImg src={Logofile} alt='Logo' />
            <LognName>Care&nbsp;Connect</LognName>
        </LogoArea>
    );
}
export default Logo;