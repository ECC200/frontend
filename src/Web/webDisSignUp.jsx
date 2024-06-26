import { useEffect, useState } from "react";
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
  const [emergencyContactArray, setEmergencyContactArray] = useState([
    { name: "", phone: "" },
    { name: "", phone: "" }
  ]);
  const [checkErr, setCheckErr] = useState(false);
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [sendBtn, setSendBtn] = useState(false);
  const [allData, setAllData] = useState({
    user_name: "",
    birth_date: "",
    age: 0,
    address: "",
    emergency_contacts: [
      { name: "", phone: "" },
      { name: "", phone: "" }
    ],
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

  const isAllDataEmpty = (data) => {
    for (let key in data) {
      if (Array.isArray(data[key])) {
        // Check if each object in the array has only empty values
        for (let item of data[key]) {
          if (!isAllDataEmpty(item)) {
            return false;
          }
        }
      } else if (data[key] !== "" && data[key] !== 0) {
        return false;
      }
    }
    return true;
  };

  const handleConfirm = () => {
    setCheckErr(false)
    setOpen(true)
    if (isAllDataEmpty(allData)) {
      setCheckErr(true)
    } else {
      handleInputChange("birth_date", dob.year + "-" + dob.month + "-" + dob.day)
      handleInputChange("emergency_contacts", emergencyContactArray)
    }
  };

  const handleSendData = async () => {
    // iconの起動
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

  const handleDialogClose = () => {
    setOpen(() => false)
  }

  return (
    <>
      {checkErr ?
        (
          <Dialog open={open} onClose={handleDialogClose} >
            <DialogTitle className={css`text-align: center;`}>メッセージ</DialogTitle>
            <DialogContent className={css`width:600px;text-align: center;`}>
              <h2>必要な情報を入力してください</h2>
            </DialogContent>
          </Dialog >
        ) : (
          !sendBtn && !checkErr ? (
            <Dialog open={open} onClose={() => { setOpen(false) }} >
              <DialogTitle className={css`text-align: center;`}>個人情報を確認してください</DialogTitle>
              <DialogContent className={css`width:600px;`}>
                <Confirm>名前：{allData.user_name}</Confirm>
                <Confirm>生年月日：{allData.birth_date}</Confirm>
                <Confirm>年齢：{allData.age}</Confirm>
                <Confirm>住所：{allData.address}</Confirm>
                <Confirm>電話番号：{allData.contact}</Confirm>
                <Confirm>かかりつけの病院：{allData.hospital_destination}</Confirm>
                <Confirm>主治医：{allData.primary_care_doctor}</Confirm>
                <Confirm>何科：{allData.specialty}</Confirm>
                <Confirm>持病名：{allData.chronicDisease}</Confirm>
                <Confirm>障害者等級：{allData.disability_grade}</Confirm>
                <Confirm className={css`text-align: center;`}>緊急連絡人</Confirm>
                <Confirm>緊急連絡1：{allData.emergency_contacts[0].name} - {allData.emergency_contacts[0].phone}</Confirm>
                <Confirm>緊急連絡2：{allData.emergency_contacts[1].name} - {allData.emergency_contacts[1].phone}</Confirm>
              </DialogContent>
              <ConfirmBtn onClick={handleSendData}>確認</ConfirmBtn>
            </Dialog >
          ) : (
            <Dialog open={open} onClose={() => setOpen(false)} >
              <DialogTitle className={css`text-align: center;`}>新規登録</DialogTitle>
              <DialogContent className={css`width:600px;`} >
                <Box className={css`text-align: center; margin:10px; `}>
                  <CircularProgress color="inherit" />
                </Box>
              </DialogContent>
            </Dialog >
          )
        )}

      <LoginContainer>
        <Logofunc />
        {/* 名前 */}
        <InputArea100>
          {checkErr && allData.user_name === "" ?
            (
              <>
                <InputNameErr htmlFor="user_name" >名前:</InputNameErr>
                <InputBarErr
                  type="text"
                  name="user_name"
                  value={allData.user_name}
                  onChange={(e) => handleInputChange("user_name", e.target.value)}
                />
              </>
            ) :
            (
              <>
                <InputName htmlFor="user_name">名前:</InputName>
                <InputBar
                  type="text"
                  name="user_name"
                  value={allData.user_name}
                  onChange={(e) => handleInputChange("user_name", e.target.value)}
                />
              </>
            )
          }
        </InputArea100 >

        {/* 2 */}
        <TwoBar>
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
              {checkErr && allData.address === "" ?
                (
                  <>
                    <InputNameErr htmlFor="address">住所:</InputNameErr>
                    <InputBarErr
                      type="text"
                      name="address"
                      value={allData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <InputName htmlFor="address">住所:</InputName>
                    <InputBar
                      type="text"
                      name="address"
                      value={allData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </>
                )
              }
            </InputAreaPx>
          </TwoColumn>

          {/* 3 */}
          <TwoColumn>
            {/* 年齢 */}
            <InputAreaPx>
              <InputName>年齢:</InputName>
              <InputBarForAge type="number" value={age} readOnly />
            </InputAreaPx>

            {/* 電話番号 */}
            <InputAreaPx>
              {checkErr && allData.contact === "" ?
                (
                  <>
                    <InputNameErr htmlFor="contact">電話番号:</InputNameErr>
                    <InputBarErr
                      type="tel"
                      name="contact"
                      value={allData.contact}
                      onChange={(e) => handleInputChange("contact", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <InputName htmlFor="contact">電話番号:</InputName>
                    <InputBar
                      type="tel"
                      name="contact"
                      value={allData.contact}
                      onChange={(e) => handleInputChange("contact", e.target.value)}
                    />
                  </>
                )
              }
            </InputAreaPx>
          </TwoColumn>
        </TwoBar>

        {/* 4 */}
        <TwoBar>
          <TwoColumn>
            {/* かかりつけ医 */}
            <InputAreaPx>
              {checkErr && allData.hospital_destination === "" ?
                (
                  <>
                    <InputNameErr htmlFor="hospital_destination">かかりつけの病院:</InputNameErr>
                    <InputBarErr
                      type="text"
                      name="hospital_destination"
                      value={allData.hospital_destination}
                      onChange={(e) => handleInputChange("hospital_destination", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <InputName htmlFor="hospital_destination">かかりつけの病院:</InputName>
                    <InputBar
                      type="text"
                      name="hospital_destination"
                      value={allData.hospital_destination}
                      onChange={(e) => handleInputChange("hospital_destination", e.target.value)}
                    />
                  </>
                )}
            </InputAreaPx>

            {/* 何科 */}
            <InputAreaPx>
              {checkErr && allData.specialty === "" ?
                (
                  <>
                    <InputNameErr htmlFor="specialty">何科:</InputNameErr>
                    <InputBarErr
                      type="text"
                      name="specialty"
                      value={allData.specialty}
                      onChange={(e) => handleInputChange("specialty", e.target.value)}
                    />
                  </>) : (
                  <>
                    <InputName htmlFor="specialty">何科:</InputName>
                    <InputBar
                      type="text"
                      name="specialty"
                      value={allData.specialty}
                      onChange={(e) => handleInputChange("specialty", e.target.value)}
                    />
                  </>
                )}
            </InputAreaPx>
          </TwoColumn>

          {/* 5 */}
          <TwoColumn>
            {/* 主治医 */}
            <InputAreaPx>
              {checkErr && allData.primary_care_doctor === "" ?
                (
                  <>
                    <InputNameErr htmlFor="primary_care_doctor">主治医:</InputNameErr>
                    <InputBarErr
                      type="text"
                      name="primary_care_doctor"
                      value={allData.primary_care_doctor}
                      onChange={(e) => handleInputChange("primary_care_doctor", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <InputName htmlFor="primary_care_doctor">主治医:</InputName>
                    <InputBar
                      type="text"
                      name="primary_care_doctor"
                      value={allData.primary_care_doctor}
                      onChange={(e) => handleInputChange("primary_care_doctor", e.target.value)}
                    />
                  </>
                )}
            </InputAreaPx>

            {/* 持病名 */}
            <InputAreaPx>
              {checkErr && allData.chronicDisease === "" ?
                (
                  <>
                    <InputNameErr htmlFor="chronicDisease">持病名:</InputNameErr>
                    <InputBarErr
                      type="text"
                      name="chronicDisease"
                      value={allData.chronicDisease}
                      onChange={(e) => handleInputChange("chronicDisease", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <InputName htmlFor="chronicDisease">持病名:</InputName>
                    <InputBar
                      type="text"
                      name="chronicDisease"
                      value={allData.chronicDisease}
                      onChange={(e) => handleInputChange("chronicDisease", e.target.value)}
                    />
                  </>
                )}
            </InputAreaPx>
          </TwoColumn>

        </TwoBar>


        {/* 障害者等級 */}
        <InputArea100>
          {checkErr && allData.disability_grade === "" ?
            (
              <>
                <InputNameErr htmlFor="disability_grade">障害者等級:</InputNameErr>
                <InputBarErr
                  type="number"
                  name="disability_grade"
                  value={allData.disability_grade}
                  onChange={(e) => handleInputChange("disability_grade", e.target.value)}
                />
              </>
            ) : (
              <>
                <InputName htmlFor="disability_grade">障害者等級:</InputName>
                <InputBar
                  type="number"
                  name="disability_grade"
                  value={allData.disability_grade}
                  onChange={(e) => handleInputChange("disability_grade", e.target.value)}
                />
              </>
            )}
        </InputArea100>

        {/* 緊急連絡先 */}
        <Emergency>緊急連絡人</Emergency>
        <h4>緊急連絡人は最低一人です</h4>
        <TwoBar>
          <TwoColumn>
            {/* 関係 */}
            <InputAreaPx>
              {checkErr && emergencyContactArray[0].name === "" ?
                (
                  <>
                    <InputNameErr htmlFor="emergencyContact">緊急連絡人の関係:</InputNameErr>
                    <InputBarErr
                      type="tel"
                      name="emergencyContact1_name"
                      value={emergencyContactArray[0].name}
                      onChange={(e) => setEmergencyContactArray(prevState => {
                        const newArray = [...prevState];
                        newArray[0] = { ...newArray[0], name: e.target.value };
                        return newArray;
                      })}
                    />
                  </>
                ) : (
                  <>
                    <InputName htmlFor="emergencyContact">緊急連絡人の関係:</InputName>
                    <InputBar
                      type="tel"
                      name="emergencyContact1_name"
                      value={emergencyContactArray[0].name}
                      onChange={(e) => setEmergencyContactArray(prevState => {
                        const newArray = [...prevState];
                        newArray[0] = { ...newArray[0], name: e.target.value };
                        return newArray;
                      })}
                    />
                  </>
                )}
            </InputAreaPx>
            <InputAreaPx>
              <InputBar
                type="tel"
                name="emergencyContact2_name"
                value={emergencyContactArray[1].name}
                onChange={(e) => setEmergencyContactArray(prevState => {
                  const newArray = [...prevState];
                  newArray[1] = { ...newArray[1], name: e.target.value };
                  return newArray;
                })}
              />
            </InputAreaPx>
          </TwoColumn>

          {/* 電話番号 */}
          <TwoColumn>
            <InputAreaPx>
              {checkErr && emergencyContactArray[0].phone === "" ?
                (
                  <>
                    <InputNameErr htmlFor="emergencyContact">緊急連絡電話番号:</InputNameErr>
                    <InputBarErr
                      type="tel"
                      name="emergencyContact1_phone"
                      value={emergencyContactArray[0].phone}
                      onChange={(e) => setEmergencyContactArray(prevState => {
                        const newArray = [...prevState];
                        newArray[0] = { ...newArray[0], phone: e.target.value };
                        return newArray;
                      })}
                    />
                  </>
                ) : (
                  <>
                    <InputName htmlFor="emergencyContact">緊急連絡電話番号:</InputName>
                    <InputBar
                      type="tel"
                      name="emergencyContact1_phone"
                      value={emergencyContactArray[0].phone}
                      onChange={(e) => setEmergencyContactArray(prevState => {
                        const newArray = [...prevState];
                        newArray[0] = { ...newArray[0], phone: e.target.value };
                        return newArray;
                      })}
                    />
                  </>
                )
              }
            </InputAreaPx>

            <InputAreaPx>
              <InputBar
                type="tel"
                name="emergencyContact2_phone"
                value={emergencyContactArray[1].phone}
                onChange={(e) => setEmergencyContactArray(prevState => {
                  const newArray = [...prevState];
                  newArray[1] = { ...newArray[1], phone: e.target.value };
                  return newArray;
                })}
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
      span{
        font - size: 75%;
      margin-bottom:100px
  }
      `;

const InputNameErr = styled.label`
      color: #ff1515;
      font-size: 150%;
      span{
        font - size: 75%;
      margin-bottom:100px
  }
      `;

const Select = styled.select`
      background-color: #fff;
      border: 1px solid #000;
      border-radius: 10px;
      font-size:18px;
      color: #000;
      height: 40px;
      width: 100px;
      margin-right:40px;
      text-align: center;
      :hover {
        background - color: hsl(0 0% 85%);
  }
      `;

const InputBar = styled.input`
      background-color: #fff;
      border: 1px solid #000;
      border-radius: 10px;
      font-size:18px;
      color: #000;
      height: 40px;
      margin-top: 5px;
      padding-left: 15px;
      :hover {
        background - color: hsl(0 0% 85%);
  }
      `;

const InputBarErr = styled.input`
      background-color: #fff;
      border: 1px solid #ff1515;
      border-radius: 10px;
      font-size:18px;
      color: red;
      height: 40px;
      margin-top: 5px;
      padding-left: 15px;
      :hover {
        background - color: hsl(0 0% 85%);
  }
      `;

const InputBarForAge = styled.input`
      background-color:  hsl(0, 0%, 73%);
      border: 1px solid #000;
      border-radius: 10px;
      font-size:18px;
      color: #000;
      height: 40px;
      margin-top: 5px;
      padding-left: 15px;
      outline: none;
      :hover {
        background - color:  hsl(0, 0%, 73%));
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