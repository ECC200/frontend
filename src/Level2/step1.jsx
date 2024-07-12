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
  const [error, setError] = useState(false);

  // eslint-disable-next-line no-undef
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhot:8080/login', {
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
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(true);
    }
  };

  return (
    <Container>
      <Logofunc />

      <InputArea>
        <InputSet>
          <InputLabelBlack htmlFor="staffId">スタッフ番号:</InputLabelBlack>
          <InputBar
            type="text"
            name="staffId"
            value={staffId}
            onChange={(e) => {
              setStaffId(e.target.value);
              setError(false); // 入力が変更された場合にエラー状態をリセットする
            }}
          />
        </InputSet>

        <InputSet>
          <InputLabelBlack htmlFor="password">パスワード:</InputLabelBlack>
          <InputBar
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false); // 入力が変更された場合にエラー状態をリセットする
            }}
            css={error ? errorStyle : null}
          />
        </InputSet>
        {error && <ErrorMessage>IDかパスワードどちらかまちがえています。もう一度入力してください。</ErrorMessage>}
      </InputArea>
      <SubmitBtn onClick={handleLogin}>ログイン</SubmitBtn>
    </Container>
  );
}

export default Step1;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const SubmitBtn = styled.button`
  border: ${BtnBorder} solid #000;
  color: #000;
  ${SubmitBtnPattern}
`;

const errorStyle = styled.input`
  border-color: red;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 8px;
  text-align: center;
`;
