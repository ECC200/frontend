import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";

function DisSignUpTop() {
  // const navigate = useNavigate();
  const [dob, setDob] = useState({ year: "", month: "", day: "" });
  const [age, setAge] = useState("");
  const [allData, setAllData] = useState({
    user_name: "",
    birth_date: "",
    age: 0,
    address: "",
    emergency_contacts: "",
    contact: "",
    hospital_destination: "",
    primary_care_doctor: "",
    specialty: "",
    chronicDisease: "",
    disability_grade: ""
  });


  {/* 生年月日で年齢を計算 */ }
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
      setAllData((prevData) => ({
        ...prevData,
        birth: birthDate.toISOString().split('T')[0],
        age: Math.abs(ageDate.getUTCFullYear() - 1970)
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setAllData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSendData = () => {
    console.log(allData);
  };

  return (
    <LoginContainer>
      <Logofunc />
      {/* 名前 */}
      <InputArea100>
        <InputName htmlFor="name">名前:</InputName>
        <InputBar
          type="text"
          name="name"
          value={allData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </InputArea100>

      <TwoBar>
        {/* 2 */}
        <TwoColumn>
          {/* 生年月日 */}
          <InputAreaPx>
            <InputName>生年月日:</InputName>

            <BirthArea>
              {/* 年 */}
              <div>
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
              </div>

              {/* 月 */}
              <div>
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
              </div>

              {/* 日 */}
              <div>
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

            </BirthArea>
          </InputAreaPx>
          {/* 住所 */}
          <InputAreaPx>
            <InputName htmlFor="address">住所:</InputName>
            <InputBar
              type="text"
              name="address"
              value={allData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </InputAreaPx>
        </TwoColumn>
        {/* 3 */}
        <TwoColumn>

          {/* 年齢 */}
          <InputAreaPx>
            <InputName>年齢:</InputName>
            <InputBar type="text" value={age} readOnly />
          </InputAreaPx>
          {/* 電話番号 */}
          <InputAreaPx>
            <InputName htmlFor="phoneNumber">電話番号:</InputName>
            <InputBar
              type="tel"
              name="phoneNumber"
              value={allData.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
            />
          </InputAreaPx>
        </TwoColumn>
      </TwoBar>


      {/* 緊急連絡先 */}
      <InputArea100>
        <InputName htmlFor="emergencyContact">緊急連絡先:</InputName>
        <InputBar
          type="tel"
          name="emergencyContact"
          value={allData.emergencyContact}
          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
        />
      </InputArea100>

      {/* 5 */}
      <TwoBar>
        <TwoColumn>
          {/* かかりつけ医 */}
          <InputAreaPx>
            <InputName htmlFor="familyHospital">かかりつけの病院:</InputName>
            <InputBar
              type="text"
              name="familyHospital"
              value={allData.familyHospital}
              onChange={(e) => handleInputChange("familyHospital", e.target.value)}
            />
          </InputAreaPx>
          {/* 何科 */}
          <InputAreaPx>
            <InputName htmlFor="specialty">何科:</InputName>
            <InputBar
              type="text"
              name="specialty"
              value={allData.specialty}
              onChange={(e) => handleInputChange("specialty", e.target.value)}
            />
          </InputAreaPx>
        </TwoColumn>
        {/* 6 */}
        <TwoColumn>
          {/* 主治医 */}
          <InputAreaPx>
            <InputName htmlFor="attendingDoctor">主治医:</InputName>
            <InputBar
              type="text"
              name="attendingDoctor"
              value={allData.attendingDoctor}
              onChange={(e) => handleInputChange("attendingDoctor", e.target.value)}
            />
          </InputAreaPx>
          {/* 持病名 */}
          <InputAreaPx>
            <InputName htmlFor="chronicDisease">持病名:</InputName>
            <InputBar
              type="text"
              name="chronicDisease"
              value={allData.chronicDisease}
              onChange={(e) => handleInputChange("chronicDisease", e.target.value)}
            />
          </InputAreaPx>
        </TwoColumn>
      </TwoBar>


      {/* 障害者等級 */}
      <InputArea100>
        <InputName htmlFor="disabilityLevel">障害者等級:</InputName>
        <InputBar
          type="text"
          name="disabilityLevel"
          value={allData.disabilityLevel}
          onChange={(e) => handleInputChange("disabilityLevel", e.target.value)}
        />
      </InputArea100>

      {/* 新規登録 Btn */}
      <SubmitBtn onClick={handleSendData}>新規登録</SubmitBtn>
    </LoginContainer >
  );
}

export default DisSignUpTop;

const LoginContainer = styled.div`
  margin: 3.5% auto 5% auto;
  width: 50%;
  display:flex;
  flex-direction: column;
  justify-content: center;
`;

const TwoBar = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: normal;
  column-gap: 10%;
`;

const InputAreaPx = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 385px;
  margin: 15px auto;
  letter-spacing: 5px;
`;
const InputArea100 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 15px auto;
  letter-spacing: 5px;
`;

const BirthArea = styled.div`
  margin-top: 5px;
  display: flex;
  width: 100%;
  justify-content: start;
`;

const InputName = styled.label`
  color: #000;
  font-size: 150%;
`;

const Select = styled.select`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  color: #000;
  height: 40px;
  width: 100px;
  margin-right:40px;
  text-align: center;
  :hover {
    background-color: hsl(0 0% 85%);
  }
`;

const InputBar = styled.input`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  color: #000;
  height: 40px;
  margin-top: 5px;
  padding-left: 15px;
  :hover {
    background-color: hsl(0 0% 85%);
  }
`;

const TwoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const SubmitBtn = styled.button`
  border: 1px solid #000;
  background-color: transparent;
  border-radius: 20px;
  color: #000;
  font-size: 100%;
  letter-spacing: 5px;
  margin: 0 auto;
  margin-top: 5%;
  padding: 10px 20px;
  text-transform: uppercase;
  cursor: pointer;
`;
