import { useState } from "react";
import { css } from '@emotion/css'
import Axios from 'axios';
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function DisSignUpTop() {
  const [dob, setDob] = useState({ year: "", month: "", day: "" });
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [sendBtn, setSendBtn] = useState(false);
  // const [successMsg, setSuccessMsg] = useState(false);
  const [allData, setAllData] = useState({
    name: "",
    birth: "",
    age: 0,
    address: "",
    emergencyPerson1: "",
    emergencyPerson2: "",
    emergencyContact1: "",
    emergencyContact2: "",
    contact: "",
    familyHospital: "",
    attendingDoctor: "",
    specialty: "",
    disease: "",
    disabilitLevel: ""
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

  const handleConfirm = () => {
    setOpen(true)
  };

  const handleSendData = async () => {
    setSendBtn(true)
    try {
      const response = await Axios.post('localhost:8080', {
      });
      switch (response.statusCode) {
        default:
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {sendBtn === false ? (
          <>
            <DialogTitle className={css`text-align: center;`}>個人情報を確認してください</DialogTitle>
            <DialogContent className={css`width:600px;`}>
              <Confirm>名前：{allData.name}</Confirm>
              <Confirm>生年月日：{allData.birth}</Confirm>
              <Confirm>年齢：{allData.age}</Confirm>
              <Confirm>住所：{allData.address}</Confirm>
              <Confirm>電話番号：{allData.contact}</Confirm>
              <Confirm>かかりつけの病院：{allData.familyHospital}</Confirm>
              <Confirm>主治医：{allData.attendingDoctor}</Confirm>
              <Confirm>何科：{allData.specialty}</Confirm>
              <Confirm>持病名：{allData.disease}</Confirm>
              <Confirm>障害者等級：{allData.disabilityLevel}</Confirm>
              <Confirm className={css`text-align: center;`}>緊急連絡人</Confirm>
              <Confirm>緊急連絡1：{allData.emergencyPerson1} - {allData.emergencyContact1}</Confirm>
              <Confirm>緊急連絡2：{allData.emergencyPerson2} - {allData.emergencyContact2}</Confirm>
            </DialogContent>
            <ConfirmBtn onClick={handleSendData}>確認</ConfirmBtn>
          </>
        ) : (
          <>
            <DialogTitle className={css`text-align: center;`}>新規登録</DialogTitle>
            <DialogContent className={css`width:600px;`}>
              <Box className={css`text-align: center; margin:10px; `}>
                <CircularProgress color="inherit" />
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog >


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
              <InputName htmlFor="disease">持病名:</InputName>
              <InputBar
                type="text"
                name="disease"
                value={allData.chronicDisease}
                onChange={(e) => handleInputChange("disease", e.target.value)}
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

        {/* 緊急連絡先 */}
        <Emergency>緊急連絡人</Emergency>
        <TwoBar>
          <TwoColumn>
            {/* 関係 */}
            <InputAreaPx>
              <InputName htmlFor="emergencyContact">緊急連絡人の関係:</InputName>
              <InputBar
                type="tel"
                name="emergencyContact1People"
                value={allData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyPerson1", e.target.value)}
              />
            </InputAreaPx>

            <InputAreaPx>
              <InputBar
                type="tel"
                name="emergencyContact2"
                value={allData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyPerson2", e.target.value)}
              />
            </InputAreaPx>
          </TwoColumn>

          {/* 電話番号 */}
          <TwoColumn>
            <InputAreaPx>
              <InputName htmlFor="emergencyContact">緊急連絡電話番号:</InputName>
              <InputBar
                type="tel"
                name="emergencyContact"
                value={allData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact1", e.target.value)}
              />
            </InputAreaPx>
            <InputAreaPx>
              <InputBar
                type="tel"
                name="emergencyContact"
                value={allData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact2", e.target.value)}
              />
            </InputAreaPx>
          </TwoColumn>
        </TwoBar>

        {/* 新規登録 Btn */}
        <SubmitBtn onClick={handleConfirm}>新規登録</SubmitBtn>
      </LoginContainer >
    </>

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

const ConfirmBtn = styled.button`
  border: 1px solid #000;
  text-align: center;
  background-color: transparent;
  border-radius: 20px;
  color: #000;
  width:100px;
  letter-spacing: 5px;
  padding: 10px 15px;
  margin:20px auto;
  text-transform: uppercase;
`;

const Emergency = styled.h2`
  margin-top:30px;
  text-align: center;
`

const Confirm = styled.h3`
  margin:5px 0;
`