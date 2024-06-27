import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";
import axios from "axios";

function DisSignUpTop() {
  const navigate = useNavigate();
  const [dob, setDob] = useState({ year: "", month: "", day: "" });
  const [age, setAge] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: "", phone: "" }]);
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    address: "",
    contact: "",
    chronic_disease: "",
    primary_care_doctor: "",
    medication_status: "",
    doctor_comment: ""
  });

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

  const handleEmergencyContactChange = (index, field, value) => {
    const newContacts = [...emergencyContacts];
    newContacts[index][field] = value;
    setEmergencyContacts(newContacts);
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: "", phone: "" }]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const data = {
      ...formData,
      birth_date: new Date(dob.year, dob.month - 1, dob.day).toISOString().split('T')[0],
      age,
      emergency_contacts: emergencyContacts,
      history: [],  // 空の履歴配列
      date: [],  
    };

    console.log("Submitting data:", data); // データをコンソールに出力して確認

    try {
      const response = await axios.post("http://localhost:8080/users", data);
      if (response.status === 200) {
        navigate("../webstaffdata");
      }
    } catch (error) {
      console.error("Error creating user:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <LoginContainer>
      <Logofunc />
      <InputArea>
        <InputName htmlFor="user_name">名前:</InputName>
        <InputBar type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <InputName>生年月日:</InputName>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Select value={dob.year} onChange={(e) => handleDobChange("year", e.target.value)}>
            <option value="">年</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          <Select value={dob.month} onChange={(e) => handleDobChange("month", e.target.value)}>
            <option value="">月</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </Select>
          <Select value={dob.day} onChange={(e) => handleDobChange("day", e.target.value)}>
            <option value="">日</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </Select>
        </div>
      </InputArea>
      <InputArea>
        <InputName>年齢:</InputName>
        <InputBar type="text" value={age} readOnly />
      </InputArea>
      <AddContactBtn onClick={addEmergencyContact}>緊急連絡先を追加</AddContactBtn>
      {emergencyContacts.map((contact, index) => (
        <div key={index}>
          <InputArea>
            <InputName htmlFor={`name-${index}`}>名前:</InputName>
            <InputBar
              type="text"
              name={`name-${index}`}
              value={contact.name}
              onChange={(e) => handleEmergencyContactChange(index, "name", e.target.value)}
            />
          </InputArea>
          <InputArea>
            <InputName htmlFor={`phone-${index}`}>電話番号:</InputName>
            <InputBar
              type="tel"
              name={`phone-${index}`}
              value={contact.phone}
              onChange={(e) => handleEmergencyContactChange(index, "phone", e.target.value)}
            />
          </InputArea>
        </div>
      ))}
      <InputArea>
        <InputName htmlFor="address">住所:</InputName>
        <InputBar type="text" name="address" value={formData.address} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <InputName htmlFor="contact">本人連絡先:</InputName>
        <InputBar type="text" name="contact" value={formData.contact} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <InputName htmlFor="chronic_disease">持病名:</InputName>
        <InputBar type="text" name="chronic_disease" value={formData.chronic_disease} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <InputName htmlFor="primary_care_doctor">かかりつけ医:</InputName>
        <InputBar type="text" name="primary_care_doctor" value={formData.primary_care_doctor} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <InputName htmlFor="medication_status">服薬中の薬:</InputName>
        <InputBar type="text" name="medication_status" value={formData.medication_status} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <InputName htmlFor="doctor_comment">主治医のコメント:</InputName>
        <InputBar type="text" name="doctor_comment" value={formData.doctor_comment} onChange={handleChange} />
      </InputArea>
      <SubmitBtn onClick={handleSubmit}>新規登録</SubmitBtn>
    </LoginContainer>
  );
}

export default DisSignUpTop;

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
  height: 40px;
  width: 100%;
  transition: 0.3s;
  :hover {
    background-color: hsl(0 0% 85%);
    transition: 0.3s;
  }
  @media (min-width: 768px) {
    font-size: 120%;
    height: 50px;
    width: 65%;
  }
`;

const AddContactBtn = styled.button`
  border: 1px solid #000;
  background-color: transparent;
  border-radius: 20px;
  color: #000;
  font-size: 100%;
  letter-spacing: 5px;
  margin: 5% auto;
  height: 40px;
  width: 100%;
  transition: 0.3s;
  :hover {
    background-color: hsl(0 0% 85%);
    transition: 0.3s;
  }
  @media (min-width: 768px) {
    font-size: 120%;
    height: 50px;
    width: 65%;
  }
`;

