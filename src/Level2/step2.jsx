import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";
import { Global, css } from '@emotion/react'

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
          body{
            background-color: ${bgColor};
          }
        `}
      />
      <Step2Container>
        <LogoutButton onClick={() => navigate("/step1")}>ログアウト</LogoutButton>
        <Logofunc color='#fff' />
        <InputArea>
          <InputName htmlFor="disabilityId">障害者番号:</InputName>
          <InputBar
            type="text"
            name="disabilityId"
            placeholder="障がい者番号を入力してください"
            value={disabilityId}
            onChange={(e) => setDisabilityId(e.target.value)}
          />
        </InputArea>
        <SubmitBtn onClick={handleSubmit}>入力</SubmitBtn>
      </Step2Container>
    </>
  );
}

export default Step2;

const bgColor = 'green'

const Step2Container = styled.div`
background-color: ${bgColor};
display: flex;
flex-direction: column;
align-items: center;
padding-top: 25px;
`;

const LogoutButton = styled.button`
  background-color: green;
  border: 1px solid white;
  border-radius:5px;
  color: white;
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 3% auto;
  @media (min-width: 768px) {
    width: 65%;
    margin: 4% auto;
  }
`;

const InputBar = styled.input`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  color: #000;
  height: 40px;
  margin-top: 5px;
  padding-left: 10px;
  :hover {
    background-color: hsl(0 0% 85%);
  }
  @media (min-width: 768px) {
    height: 50px;
  }
`;

const InputName = styled.label`
  color: white;
  font-size: 100%;
  @media (min-width: 768px) {
    font-size: 120%;
  }
`;

const SubmitBtn = styled.button`
  border: 1px solid white;
  border-radius:10px;
  background-color: green;
  color: white;
  font-size: 100%;
  letter-spacing: 5px;
  margin: 5% auto;
  padding: 10px 30px;
  text-transform: uppercase;
  width: auto;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 120%;
    padding: 12px 24px;
  }
`;
