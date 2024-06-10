import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";

function Step1Login() {
  const navigate = useNavigate();

  const LoginContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 600px; /* Adjust max-width as needed */
  margin: 0 auto;
`;


const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 4% auto; /* Adjust margin as needed */
  letter-spacing: 5px;
  @media (min-width: 768px) {
    width: 65%;
  }
`;

const InputName = styled.label`
  color: #000;
  font-size: 100%;
  @media (min-width: 768px) {
    font-size: 120%;
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


  return (
    <LoginContainer>
      <Logofunc />
      <InputArea>
        <InputName htmlFor="staffId">スタッフ番号:</InputName>
        <InputBar type="text" name="staffId" />
      </InputArea>
      <InputArea>
        <InputName htmlFor="password">パスワード:</InputName>
        <InputBar type="password" name="password" />
      </InputArea>
      <SubmitBtn onClick={() => navigate("/step2/")}>ログイン</SubmitBtn>
    </LoginContainer>
  );
}

export default Step1Login;