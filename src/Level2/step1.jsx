import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";

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
    <LoginContainer>
      <Logofunc />
      <InputArea>
        <InputSet>
          <InputName htmlFor="staffId">スタッフ番号:</InputName>
          <InputBar type="text" name="staffId" value={staffId} onChange={(e) => setStaffId(e.target.value)} />
        </InputSet>
        <InputSet>
          <InputName htmlFor="password">パスワード:</InputName>
          <InputBar type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </InputSet>
      </InputArea>
      <SubmitBtn onClick={handleLogin}>ログイン</SubmitBtn>
    </LoginContainer>
  );
}

export default Step1;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 3vh 3.5vh 0 3.5vh;
`;

const InputArea = styled.div`
  margin: 5% 0;
`

const InputSet = styled.div`
display: flex;
flex-direction: column;
margin: 3% auto;
letter-spacing: 5px;
`;

const InputName = styled.label`
color: #000;
font-size: 100%;

`;

const InputBar = styled.input`
background-color: #fff;
border: 1px solid #000;
border-radius: 10px;
color: #000;
height: 40px;
width: 320px;
margin-top: 5px;
padding-left: 10px;
:hover {
  background-color: hsl(0 0% 85%);
}
@media (min-width: 768px) {
  height: 50px;
}
`;

const SubmitBtn = styled.button`
border: 1px solid #000;
background-color: transparent;
color: #000;
font-size: 100%;
letter-spacing: 5px;
margin: 5% auto;
padding: 10px 20px;
text-transform: uppercase;
width: auto;
cursor: pointer;
@media (min-width: 768px) {
  font-size: 120%;
  padding: 12px 24px;
}
`;
