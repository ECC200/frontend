import Logofile from './assets/logo.png'
import styled from '@emotion/styled'

function Logo(props) {
    // eslint-disable-next-line react/prop-types
    const logoNameColor = props.color ?? '#000';
    const LogoArea = styled.div`
        display: grid;
        justify-content: center;
        margin-left:auto;
        margin-right:auto;
    `
    const LogoImg = styled.img`
    margin: 0 auto;
    filter: drop-shadow(0 0 1px #000);
    width: 150px;
    @media (min-width: 768px) {
        width: 200px;
    }
    `
    const LognName = styled.p`
        color: ${logoNameColor};
        letter-spacing:10px;
        padding:0;
        margin: 0;
        text-align: center;
        text-transform: uppercase;
        font-size: 20px;
        @media (min-width: 768px) {
            font-size: 23px;
        }
    `
    return (
        <LogoArea>
            <LogoImg src={Logofile} alt='Logo' />
            <LognName>Care&nbsp;Connect</LognName>
        </LogoArea>
    );
}
export default Logo;