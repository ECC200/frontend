import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";

import {
  // Container
  Container,
  // Button
  BtnBorder, SubmitBtnPattern,
  // Input
  InputArea, InputLabelBlack, InputBar,
} from '../EmotionForMoblie';

function Step1() {
  const navigate = useNavigate();

  return (
    <Container>
      <Logofunc />

      <InputArea>
        <InputSet>
          <InputLabelBlack htmlFor="staffId">スタッフ番号:</InputLabelBlack>
          <InputBar type="text" name="staffId" />
        </InputSet>

        <InputSet>
          <InputLabelBlack htmlFor="password">パスワード:</InputLabelBlack>
          <InputBar type="password" name="password" />
        </InputSet>
      </InputArea>

      <SubmitBtn onClick={() => navigate("/step2/")}>ログイン</SubmitBtn>
    </Container>
  );
}
export default Step1;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3% auto;
  letter-spacing: 5px;
`;

const SubmitBtn = styled.button`
  border: ${BtnBorder} solid #000;
  color: #000;
  ${SubmitBtnPattern}
`;