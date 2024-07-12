import { useState } from "react";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import WebHeader from "./webHeader.jsx";
import BackButtonImage from "../assets/back.png";
import ProfilePic from "../assets/ProfilePic.svg";
import {
  Header,
  PageTitle,
  SubmitBtnPattern,
  InputLabelBlack,
  InputBar,
  ErrInputBar,
  ErrInputLabel,
  DialogBoxArea
} from "./EmotionForWeb.jsx";

function DisSignUpTop() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sendBtn, setSendBtn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(ProfilePic);
  const [dob, setDob] = useState({ year: "", month: "", day: "" });
  const [age, setAge] = useState("");
  const [haveError, setHaveError] = useState(false);
  const [allData, setAllData] = useState({
    photo: "",

    user_name: "",
    birth_date: "",
    age: age,
    address: "",
    contact: "",
    hospital_destination: "",
    primary_care_doctor: "",
    specialty: "",
    chronic_disease: "",

    disability_grade: "",
    emergency_contacts: [
      { name: "", phone: "" },
      { name: "", phone: "" },
    ],
  });
  const [inputErrors, setInputErrors] = useState({
    user_name: true,
    address: true,
    contact: true,
    hospital_destination: true,
    primary_care_doctor: true,
    specialty: true,
    chronic_disease: true,
    disability_grade: true,
    emergency_contacts: [
      { name: true, phone: true },
      { name: true, phone: true },
    ],
  });

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDobChange = (field, value) => {
    const newDob = { ...dob, [field]: value };
    setDob(newDob);
    if (newDob.year && newDob.month && newDob.day) {
      const birthDate = new Date(newDob.year, newDob.month - 1, newDob.day);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setAge(calculatedAge);
      setAllData((prevData) => ({
        ...prevData,
        birth_date: birthDate.toISOString().split("T")[0],
        age: calculatedAge,
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setAllData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    const newInputErrors = {};

    for (const key in inputErrors) {
      if (key === "emergency_contacts") {
        newInputErrors[key] = inputErrors[key].map(() => ({ name: true, phone: true }));
      } else {
        newInputErrors[key] = true;
      }
    }

    for (const key in allData) {
      if (key === "photo" || key === "emergency_contacts") continue;
      if (allData[key] === "" || allData[key] === 0) {
        newInputErrors[key] = false;
      }
    }

    if (!dob.year || !dob.month || !dob.day) {
      newInputErrors.birth_date = false;
    }

    if (!allData.emergency_contacts[0].name || !allData.emergency_contacts[0].phone) {
      newInputErrors.emergency_contacts[0] = { name: false, phone: false };
    }


    setInputErrors(newInputErrors);

    const errorFound = Object.values(newInputErrors).some(
      (value) =>
        value === false ||
        (typeof value === "object" && Object.values(value).some((v) => v === false))
    );

    setHaveError(errorFound);

    if (!errorFound) {
      setOpen(true);
    }
  };

  const handleCloseBox = () => {
    setOpen(false);
    setHaveError(false);
  };

  const handleSendData = async () => {
    setSendBtn(true);
    const formData = new FormData();
    for (const key in allData) {
      if (Array.isArray(allData[key])) {
        allData[key].forEach((item, index) => {
          for (const subKey in item) {
            formData.append(`${key}[${index}].${subKey}`, item[subKey]);
          }
        });
      } else {
        formData.append(key, allData[key]);
      }
    }
    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    // API Start 
    try {
      const formData = new FormData();
      // allDataの各フィールドをFormDataに追加
      Object.keys(allData).forEach(key => {
        if (key === 'emergency_contacts') {
          // 緊急連絡先の処理
          allData.emergency_contacts.forEach((contact, index) => {
            if (contact.name || contact.phone) {
              formData.append(`emergency_contacts[${index}].name`, contact.name);
              formData.append(`emergency_contacts[${index}].phone`, contact.phone);
            }
          });
        } else if (key !== 'photo') {
          formData.append(key, allData[key]);
        }
      });
      // 画像ファイルを追加
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }
      // FormDataの内容をデバッグ出力
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      await fetch("http://localhost:8080/users", {
        method: "POST",
        body: formData,
      });
      // 成功時の処理を追加
      // TODO: #
      setTimeout(() => {
        navigate(`/WebPatientData/#`);
      }, 1000);

    } catch (error) {
      throw new Error("Network response was not ok");
    } finally {
      setSendBtn(false);
      setOpen(false);
    }
  };

  const handleEmergencyContactChange = (index, field, value) => {
    setAllData(prevData => {
      const newEmergencyContacts = [...prevData.emergency_contacts];
      newEmergencyContacts[index] = {
        ...newEmergencyContacts[index],
        [field]: value
      };
      return {
        ...prevData,
        emergency_contacts: newEmergencyContacts
      };
    });
  };
  return (
    <>
      {haveError && (
        <Dialog open={haveError}>
          <DialogBoxArea>
            <DialogTitle>メッセージ</DialogTitle>
            <DialogContent className='DialogContentStyle'>
              <h3 className={css`text-align: center;`}>必要な情報を入力してください</h3>
              <ConfirmBtn onClick={handleCloseBox} className={css`text-align: center;`}>OK</ConfirmBtn>
            </DialogContent>
          </DialogBoxArea>
        </Dialog>
      )}

      {!sendBtn ? (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogBoxArea>
            <DialogTitle>個人情報を確認してください</DialogTitle>
            <DialogContent className='DialogContentStyle'>
              <Confirm>名前：{allData.user_name}</Confirm>
              <Confirm>生年月日：{allData.birth_date}</Confirm>
              <Confirm>年齢：{allData.age}</Confirm>
              <Confirm>住所：{allData.address}</Confirm>
              <Confirm>本人連絡先：{allData.contact}</Confirm>
              <Confirm>かかりつけの病院：{allData.hospital_destination}</Confirm>
              <Confirm>主治医：{allData.primary_care_doctor}</Confirm>
              <Confirm>何科：{allData.specialty}</Confirm>
              <Confirm>持病名：{allData.chronic_disease}</Confirm>
              <Confirm>障がい者等級：{allData.disability_grade}</Confirm>
              <Confirm className={css`text-align: center;`}>緊急連絡先</Confirm>
              <Confirm>緊急連絡1：{allData.emergency_contacts[0].name} - {allData.emergency_contacts[0].phone}</Confirm>
              <Confirm>緊急連絡2：{allData.emergency_contacts[1].name} - {allData.emergency_contacts[1].phone}</Confirm>
            </DialogContent>
            <ConfirmBtn onClick={handleSendData}>確認</ConfirmBtn>
          </DialogBoxArea>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogBoxArea>
            <DialogTitle>新規登録</DialogTitle>
            <DialogContent className='DialogContentStyle'>
              <Box className={css`text-align: center; margin:10px;`}>
                <CircularProgress color="inherit" />
              </Box>
            </DialogContent>
          </DialogBoxArea>
        </Dialog>
      )}

      <Header>
        <BackButtonStyled src={BackButtonImage} alt="戻る" onClick={() => navigate(-1)} />
        <WebHeader />
      </Header>

      <PageTitle>障がい者新規登録</PageTitle>

      <LoginContainer>
        {/* Img */}
        <ImgUploadArea>
          <img src={preview} alt="Preview" width="200" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </ImgUploadArea>

        {/* 名前 */}
        {inputErrors.user_name ? (
          <InputArea100>
            <InputLabelBlack htmlFor="user_name">名前:</InputLabelBlack>
            <InputBar
              type="text"
              name="user_name"
              value={allData.user_name}
              onChange={(e) => handleInputChange("user_name", e.target.value)}
            />
          </InputArea100 >
        ) : (
          <InputArea100>
            <ErrInputLabel htmlFor="user_name">名前:</ErrInputLabel>
            <ErrInputBar
              type="text"
              name="user_name"
              value={allData.user_name}
              onChange={(e) => handleInputChange("user_name", e.target.value)}
            />
          </InputArea100 >
        )}

        {/* 2 */}
        <TwoBar>
          <TwoColumn>
            {/* 生年月日 */}
            <InputAreaPx>
              <InputLabelBlack>生年月日:</InputLabelBlack>
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
            {inputErrors.address ? (
              <InputAreaPx>
                <InputLabelBlack htmlFor="address">住所:</InputLabelBlack>
                <InputBar
                  type="text"
                  name="address"
                  value={allData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </InputAreaPx>
            ) : (
              <InputAreaPx>
                <ErrInputLabel htmlFor="address">住所:</ErrInputLabel>
                <ErrInputBar
                  type="text"
                  name="address"
                  value={allData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </InputAreaPx>
            )}
          </TwoColumn>

          {/* 3 */}
          <TwoColumn>
            {/* 年齢 */}
            <InputAreaPx>
              <InputLabelBlack>年齢:</InputLabelBlack>
              <InputBarForAge type="number" value={age} readOnly />
            </InputAreaPx>

            {/* 電話番号 */}
            {inputErrors.contact ? (
              <InputAreaPx>
                <InputLabelBlack htmlFor="contact">電話番号:</InputLabelBlack>
                <InputBar
                  type="tel"
                  name="contact"
                  value={allData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                />
              </InputAreaPx>
            ) : (
              <InputAreaPx>
                <ErrInputLabel htmlFor="contact">電話番号:</ErrInputLabel>
                <ErrInputBar
                  type="tel"
                  name="contact"
                  value={allData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                />
              </InputAreaPx>
            )}
          </TwoColumn>
        </TwoBar>

        {/* 4 */}
        <TwoBar>
          <TwoColumn>
            {/* かかりつけ医 */}
            {inputErrors.hospital_destination ? (
              <InputAreaPx>
                <InputLabelBlack htmlFor="hospital_destination">かかりつけの病院:</InputLabelBlack>
                <InputBar
                  type="text"
                  name="hospital_destination"
                  value={allData.hospital_destination}
                  onChange={(e) => handleInputChange("hospital_destination", e.target.value)}
                />
              </InputAreaPx>
            ) : (
              <InputAreaPx>
                <ErrInputLabel htmlFor="hospital_destination">かかりつけの病院:</ErrInputLabel>
                <ErrInputBar
                  type="text"
                  name="hospital_destination"
                  value={allData.hospital_destination}
                  onChange={(e) => handleInputChange("hospital_destination", e.target.value)}
                />
              </InputAreaPx>
            )}

            {/* 何科 */}
            {inputErrors.specialty ? (
              <InputAreaPx>
                <InputLabelBlack htmlFor="specialty">何科:</InputLabelBlack>
                <InputBar
                  type="text"
                  name="specialty"
                  value={allData.specialty}
                  onChange={(e) => handleInputChange("specialty", e.target.value)}
                />
              </InputAreaPx>
            ) : (
              <InputAreaPx>
                <ErrInputLabel htmlFor="specialty">何科:</ErrInputLabel>
                <ErrInputBar
                  type="text"
                  name="specialty"
                  value={allData.specialty}
                  onChange={(e) => handleInputChange("specialty", e.target.value)}
                />
              </InputAreaPx>
            )}
          </TwoColumn>

          {/* 5 */}
          <TwoColumn>
            {/* 主治医 */}
            {inputErrors.primary_care_doctor ? (
              <InputAreaPx>
                <InputLabelBlack htmlFor="primary_care_doctor">主治医:</InputLabelBlack>
                <InputBar
                  type="text"
                  name="primary_care_doctor"
                  value={allData.primary_care_doctor}
                  onChange={(e) => handleInputChange("primary_care_doctor", e.target.value)}
                />
              </InputAreaPx>
            ) : (
              <InputAreaPx>
                <ErrInputLabel htmlFor="primary_care_doctor">主治医:</ErrInputLabel>
                <ErrInputBar
                  type="text"
                  name="primary_care_doctor"
                  value={allData.primary_care_doctor}
                  onChange={(e) => handleInputChange("primary_care_doctor", e.target.value)}
                />
              </InputAreaPx>
            )}

            {/* 持病名 */}
            {inputErrors.chronic_disease ? (
              <InputAreaPx>
                <InputLabelBlack htmlFor="chronic_disease">持病名:</InputLabelBlack>
                <InputBar
                  type="text"
                  name="chronic_disease"
                  value={allData.chronic_disease}
                  onChange={(e) => handleInputChange("chronic_disease", e.target.value)}

                />
              </InputAreaPx>
            ) : (
              <InputAreaPx>
                <ErrInputLabel htmlFor="chronic_disease">持病名:</ErrInputLabel>
                <ErrInputBar
                  type="text"
                  name="chronic_disease"
                  value={allData.chronic_disease}
                  onChange={(e) => handleInputChange("chronic_disease", e.target.value)}

                />
              </InputAreaPx>
            )}
          </TwoColumn>
        </TwoBar>

        {/* 障がい者等級 */}
        {inputErrors.disability_grade ? (
          <InputArea100>
            <InputLabelBlack htmlFor="disability_grade">障がい者等級:</InputLabelBlack>
            <InputBar
              type="number"
              name="disability_grade"
              value={allData.disability_grade}
              onChange={(e) => handleInputChange("disability_grade", e.target.value)}
            />
          </InputArea100>
        ) : (
          <InputArea100>
            <ErrInputLabel htmlFor="disability_grade">障がい者等級:</ErrInputLabel>
            <ErrInputBar
              type="number"
              name="disability_grade"
              value={allData.disability_grade}
              onChange={(e) => handleInputChange("disability_grade", e.target.value)}
            />
          </InputArea100>
        )}

        {/* 緊急連絡先 */}
        <Emergency>緊急連絡先</Emergency>
        <h4>* 緊急連絡先は最低一人です</h4>
        <TwoBar>
          {allData.emergency_contacts.map((contact, index) => (
            <TwoColumn key={index}>
              {/* 関係 */}
              <InputAreaPx>
                <InputLabelBlack htmlFor={`emergencyContact${index + 1}_name`}>
                  緊急連絡先の関係{index + 1}:
                </InputLabelBlack>
                <InputBar
                  type="text"
                  name={`emergencyContact${index + 1}_name`}
                  value={contact.name}
                  onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                />
              </InputAreaPx>


              {/* 電話番号 */}
              <InputAreaPx>
                <InputLabelBlack htmlFor={`emergencyContact${index + 1}_phone`}>
                  緊急連絡電話番号{index + 1}:
                </InputLabelBlack>
                <InputBar
                  type="tel"
                  name={`emergencyContact${index + 1}_phone`}
                  value={contact.phone}
                  onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                />
              </InputAreaPx>
            </TwoColumn>
          ))}
        </TwoBar>

        {/* 新規登録 Btn */}
        <SubmitBtn onClick={handleConfirm}>新規登録</SubmitBtn>
      </LoginContainer >
    </>

  );
}

export default DisSignUpTop;

const LoginContainer = styled.div`
      margin: 2% auto 5% auto;
      width: 50%;
      display:flex;
      flex-direction: column;
      justify-content: center;
`;

const ImgUploadArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  img{
    margin: 0 auto 20px auto;
    border: 6px solid #000;
    border-radius:10px;  
  }
  input{
    padding:10px;
  }
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


const Select = styled.select`
      border: 1px solid #000;
      border-radius: 10px;
      font-size:18px;
      color: #000;
      height: 40px;
      width: 100px;
      margin-right:40px;
      text-align: center;
      :hover {
        background-color: hsl(0 0% 85%);
      }
      `;

const InputBarForAge = styled.input`
      background-color:hsl(0, 0%, 73%);
      border: 1px solid #000;
      border-radius: 10px;
      font-size:18px;
      color: #000;
      height: 40px;
      margin-top: 5px;
      padding-left: 15px;
      outline: none;
      :hover {
        background-color: hsl(0, 0%, 73%));
      }
      `;


const TwoColumn = styled.div`
      display: flex;
      flex-direction: column;
      align-items: start;
      `;

const SubmitBtn = styled.button`
      border: 1px solid #000;
      color: #000;
      font-weight: bold;
      margin: 0 auto;
      margin-top: 5%;
      ${SubmitBtnPattern}
      `;

const ConfirmBtn = styled.button`
      border: 1px solid #000;
      text-align: center;
      color: #000;
      width:100px;
      margin:20px auto;
      ${SubmitBtnPattern}
      `;

const Emergency = styled.h2`
      margin-top:30px;
      text-align: center;
      `

const Confirm = styled.h3`
      margin:5px 0;
      `

const BackButtonStyled = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
`;
