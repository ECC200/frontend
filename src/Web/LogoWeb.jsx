import Logofile from '../assets/logo.png'
import styled from '@emotion/styled'

function Logo() {
    const LogoArea = styled.div`
        display: grid;
        padding: 5% 0;
        margin:0 auto;
        align-content: start;
    `
    const LogoImg = styled.img`
        width: 15%;
        margin: 0 auto;
        filter: drop-shadow(0 0 1px #000);
    `
    const LognName = styled.p`
        color: #000;
        letter-spacing:10px;
        padding:0.5%;
        margin: 0;
        font-size: 1.5em;
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