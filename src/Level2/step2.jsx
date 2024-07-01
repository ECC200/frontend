import { useState } from "react";
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
  const [disabilityId, setDisabilityId] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/checkDisabilityID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ disabilityId }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        navigate(`/step3/${disabilityId}`);
      } else {
        alert("障害者番号が見つかりません");
      }
    } else {
      alert("サーバーエラーが発生しました");
    }
  };

  return (
    <>
      <Global
        styles={css`
          body {
            background-color: green;
          }
        `}
      />
      <UpperRightBtn onClick={() => navigate("/step1")}>ログアウト</UpperRightBtn>
      <Container>
        <Logofunc color='#fff' />
        <InputArea>
          <InputLabelWhite htmlFor="disabilityId">障がい者番号:</InputLabelWhite>
          <InputBar
            type="text"
            name="disabilityId"
            placeholder="障がい者番号を入力してください"
            value={disabilityId}
            onChange={(e) => setDisabilityId(e.target.value)}
          />
        </InputArea>
        <SubmitBtn onClick={handleSubmit}>入力</SubmitBtn>
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
