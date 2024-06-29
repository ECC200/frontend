import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";
import { Global, css } from '@emotion/react'

import {
  // Container
  Container,
  // Button
  UpperRightBtn, BtnBorder, SubmitBtnPattern,
  // Input
  InputArea, InputLabelWhite, InputBar,
} from '../EmotionForMoblie';

function Step2() {
  const navigate = useNavigate();
  return (
    <>
      <Global
        styles={css`
          body{
            background-color: green;
          }
        `}
      />
      <Container>
        <UpperRightBtn onClick={() => navigate("/step1/")}>ログアウト</UpperRightBtn>
        <Logofunc color='#fff' />

        <InputArea>
          <InputLabelWhite htmlFor="disabilityId">障がい者番号:</InputLabelWhite>
          <InputBar type="text" name="disabilityId" placeholder="障がい者番号を入力してください" />
        </InputArea>

        <SubmitBtn onClick={() => navigate("/step3/")}>入力</SubmitBtn>
      </Container>
    </>
  );
}

export default Step2;

const SubmitBtn = styled.button`
  border: ${BtnBorder} solid #fff;
  color: #fff;
  ${SubmitBtnPattern}
`;