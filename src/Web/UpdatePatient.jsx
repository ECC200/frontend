import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Logo from '../LogoSetup';
import PlusIconImage from '../assets/plus_icon.png';
import PersonImg from '../assets/taku.jpeg';
import BackButtonImage from '../assets/back.png';
import SaveButtonImage from '../assets/save.png';

const lineSize = '2.5px';

function UpdatePatient() {
    const navigate = useNavigate();
    const PatientData = {
        PersonImg: <Person_img src={PersonImg} alt="患者画像" />,
        Fullname: '岸本 たく',
        Age: '20',
        Birthday: '2003-08-30',
        DisabilityType: '障害種別',
        DisabilityLevel: '障害者等級',
        Hospital: 'かかりつけ病院',
        Doctor: '担当医',
        PersonContact: '080-3860-1577',
        EmergencyContact: '0120-333-906',
        Address: '大阪府吹田市春日4-7-1-310',
        Medicine: 'デパケン',
        DoctorMessage: 'がんばってねー'
    };

    const initialContent = [
        { date: '2023-08-16', content: '定期健診、ビムパット50mg追加' }
    ];

    const [contentList, setContentList] = useState(initialContent);
    const [newContent, setNewContent] = useState({ date: '', content: '' });

    const handleAddContent = () => {
        if (newContent.date && newContent.content) {
            const updatedContentList = [newContent, ...contentList].sort((a, b) => new Date(b.date) - new Date(a.date));
            setContentList(updatedContentList);
            setNewContent({ date: '', content: '' });
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSaveClick = () => {
        const patientDataToSave = { ...PatientData, contentList };
        localStorage.setItem('patientData', JSON.stringify(patientDataToSave));
        alert('データが保存されました');
    };

    return (
        <>
            <Header>
                <BackButtonStyled src={BackButtonImage} alt="戻る" onClick={handleBackClick} />
                <SaveButtonStyled src={SaveButtonImage} alt="保存" onClick={handleSaveClick} />
            </Header>
            <Logo />
            <ContainerStyle>
                <LeftStyle>
                    {PatientData.PersonImg}
                    <InfoLeftData>
                        <InfoLeftDataItem>名前 : {PatientData.Fullname}</InfoLeftDataItem>
                        <InfoLeftDataItem>年齢 : {PatientData.Age}</InfoLeftDataItem>
                        <InfoLeftDataItem>生年月日 : {PatientData.Birthday}</InfoLeftDataItem>
                        <InfoLeftDataItem>障がい種別 : {PatientData.DisabilityType}</InfoLeftDataItem>
                        <InfoLeftDataItem>障がい者等級 : {PatientData.DisabilityLevel}</InfoLeftDataItem>
                        <InfoLeftDataItem>かかりつけ病院 : {PatientData.Hospital}</InfoLeftDataItem>
                        <InfoLeftDataItem>かかりつけ医 : {PatientData.Doctor}</InfoLeftDataItem>
                        <InfoLeftDataItem>本人連絡先 : {PatientData.PersonContact}</InfoLeftDataItem>
                        <InfoLeftDataItem>緊急連絡先 : {PatientData.EmergencyContact}</InfoLeftDataItem>
                        <InfoLeftDataItem>住所 : {PatientData.Address}</InfoLeftDataItem>
                    </InfoLeftData>
                </LeftStyle>

                <InfoCenterData>
                    <DateContentStyle>
                        <input
                            type="date"
                            value={newContent.date}
                            onChange={(e) => setNewContent({ ...newContent, date: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="内容"
                            value={newContent.content}
                            onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                        />
                        <PlusIconStyled src={PlusIconImage} alt="追加" onClick={handleAddContent} />
                    </DateContentStyle>
                    <ContentListStyle>
                        {contentList.map((item, index) => (
                            <InfoCenterDataItem key={index}>
                                <span>{item.date}</span>
                                <span>{item.content}</span>
                            </InfoCenterDataItem>
                        ))}
                    </ContentListStyle>
                </InfoCenterData>

                <InfoRightData>
                    使用中の薬：<InfoRightDataTop>{PatientData.Medicine}</InfoRightDataTop>
                    主治医から：<InfoRightDataItemBottom>{PatientData.DoctorMessage}</InfoRightDataItemBottom>
                </InfoRightData>
            </ContainerStyle>
        </>
    );
}

export default UpdatePatient;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
`;

const BackButtonStyled = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const SaveButtonStyled = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 1130px;
  cursor: pointer;
  float: right;
`;

const ContainerStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 10px;
  border: ${lineSize} solid #000;
  border-radius: 15px;
  margin: 20px;
`;

const LeftStyle = styled.div`
  border-right: ${lineSize} solid #000;
  text-align: center;
  padding: 10px;
`;

const Person_img = styled.img`
  width: 120px;
  height: 160px;
  margin-bottom: 10px;
`;

const DateContentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${lineSize} solid #000;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  input {
    margin: 0 5px;
    padding: 5px;
    font-size: 1em;
  }
`;

const ContentListStyle = styled.div`
  list-style-type: none;
  padding: 0;y
`;

const InfoLeftData = styled.div`
  text-align: left;
  p {
    margin: 0;
    padding: 5px 0;
  }
`;

const InfoLeftDataItem = styled.p``;

const InfoCenterData = styled.div`
  text-align: center;
  padding: 10px;
`;

const PlusIconStyled = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const InfoCenterDataItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: ${lineSize} solid #000;
  padding: 10px 0;
  span {
    flex: 1;
    text-align: left;
  }
`;

const InfoRightData = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: ${lineSize} solid #000;
`;

const InfoRightDataTop = styled.div`
  flex: 1;
  border-bottom: ${lineSize} solid #000;
  padding: 5px 0;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const InfoRightDataItemBottom = styled.div`
  flex: 1;
  padding: 5px 0;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 10px;
`;
