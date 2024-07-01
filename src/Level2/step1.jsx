import { useState } from "react";
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
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ staffId, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          navigate("/step2/");
        } else {
          alert("ログインに失敗しました: " + data.message);
        }
      } else {
        alert("サーバーエラーが発生しました");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("ログイン中にエラーが発生しました");
    }
  };

  return (
    <Container>
      <Logofunc />
      <InputArea>
        <InputSet>
          <InputLabelBlack htmlFor="staffId">スタッフ番号:</InputLabelBlack>
          <InputBar type="text" name="staffId" value={staffId} onChange={(e) => setStaffId(e.target.value)} />
        </InputSet>
        <InputSet>
          <InputLabelBlack htmlFor="password">パスワード:</InputLabelBlack>
          <InputBar type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </InputSet>
      </InputArea>
      <SubmitBtn onClick={handleLogin}>ログイン</SubmitBtn>
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
