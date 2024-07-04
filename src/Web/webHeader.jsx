import Logofile from "../assets/logo.png";
import styled from "@emotion/styled";
import { Global, css } from '@emotion/react';

function webHeader() {
  const LogoArea = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color:grey;
    padding:0.3% 0;
  `;
  const LogoImg = styled.img`
    width: 100px;
    margin: 0 10px;
    filter: drop-shadow(0 0 1px #000);
  `;
  const LogoName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    letter-spacing: 20px;
    padding: 0 auto;
    font-size: 25px;
    text-align: center;
    text-transform: uppercase;
    span{
      letter-spacing: 10px;
      margin-left:10px;
    }
  `;

  return (
    <>
      <Global
        styles={css`
      * {
        margin: 0;
        box-sizing: border-box;
      }
    `}
      />
      <LogoArea>
        <LogoName>
          &nbsp;&nbsp;Care
          <LogoImg src={Logofile} alt="Logo" />
          <span>Connect</span>
        </LogoName>
      </LogoArea>
    </>
  );
}

export default webHeader;