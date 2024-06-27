import Logofile from "../assets/logo.png";
import styled from "@emotion/styled";

function webHeader() {
  const LogoArea = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
  `;
  const LogoImg = styled.img`
    width: 100px;
    @media (min-width: 768px) {
        width: 150px;
    }
    margin: 0 auto;
    filter: drop-shadow(0 0 1px #000);
  `;
  const LogoName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    letter-spacing: 20px;
    padding: 0;
    font-size: 30px;
    text-align: center;
    text-transform: uppercase;
  `;

  return (
    <LogoArea>
      <LogoName>
        Care&nbsp;
        <LogoImg src={Logofile} alt="Logo" />
        &nbsp;Connect
      </LogoName>
    </LogoArea>
  );
}

export default webHeader;
