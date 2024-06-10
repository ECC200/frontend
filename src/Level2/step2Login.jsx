import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";

function Step2Login() {
  const navigate = useNavigate();

  const Step2Container = styled.div`
  background-color: green;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  width: 100%;
  position: relative;
`;


  const LogoutButton = styled.button`
    background-color: green;
    border: 1px solid white;
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
    margin: 2% auto;
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
    background-color: green;
    color: white;
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
    <Step2Container>
      <LogoutButton onClick={() => navigate("/")}>ログアウト</LogoutButton>
      <Logofunc />
      <InputArea>
        <InputName htmlFor="disabilityId">障害者番号:</InputName>
        <InputBar type="text" name="disabilityId" />
      </InputArea>
      <SubmitBtn onClick={() => navigate("/step3/")}>入力</SubmitBtn>
    </Step2Container>
  );
}

export default Step2Login;
