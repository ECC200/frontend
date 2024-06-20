import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";

function DisSignUpTop() {
  const navigate = useNavigate();
  const [dob, setDob] = useState({ year: "", month: "", day: "" });
  const [age, setAge] = useState("");

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDobChange = (field, value) => {
    const newDob = { ...dob, [field]: value };
    setDob(newDob);
    if (newDob.year && newDob.month && newDob.day) {
      const birthDate = new Date(newDob.year, newDob.month - 1, newDob.day);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      setAge(Math.abs(ageDate.getUTCFullYear() - 1970));
    }
  };

  const LoginContainer = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
  `;

  const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 4% auto;
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

  const Select = styled.select`
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
    border-radius: 20px;
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
        <InputName htmlFor="name">名前:</InputName>
        <InputBar type="text" name="name" />
      </InputArea>
      <InputArea>
        <InputName>生年月日:</InputName>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Select
            value={dob.year}
            onChange={(e) => handleDobChange("year", e.target.value)}
          >
            <option value="">年</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select
            value={dob.month}
            onChange={(e) => handleDobChange("month", e.target.value)}
          >
            <option value="">月</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
          <Select
            value={dob.day}
            onChange={(e) => handleDobChange("day", e.target.value)}
          >
            <option value="">日</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
        </div>
      </InputArea>
      <InputArea>
        <InputName>年齢:</InputName>
        <InputBar type="text" value={age} readOnly />
      </InputArea>
      <InputArea>
        <InputName htmlFor="emergencyContact">緊急連絡先:</InputName>
        <InputBar type="tel" name="emergencyContact" />
      </InputArea>
      <InputArea>
        <InputName htmlFor="phoneNumber">電話番号:</InputName>
        <InputBar type="tel" name="phoneNumber" />
      </InputArea>
      <InputArea>
        <InputName htmlFor="primaryDoctor">かかりつけ医:</InputName>
        <InputBar type="text" name="primaryDoctor" />
      </InputArea>
      <InputArea>
        <InputName htmlFor="attendingDoctor">主治医:</InputName>
        <InputBar type="text" name="attendingDoctor" />
      </InputArea>
      <InputArea>
        <InputName htmlFor="specialty">何科:</InputName>
        <InputBar type="text" name="specialty" />
      </InputArea>
      <InputArea>
        <InputName htmlFor="chronicDisease">持病名:</InputName>
        <InputBar type="text" name="chronicDisease" />
      </InputArea>
      <SubmitBtn onClick={() => navigate("/*遷移先*/")}>新規登録</SubmitBtn>
    </LoginContainer>
  );
}

export default DisSignUpTop;
