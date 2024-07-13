import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { css } from '@emotion/css';

import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PlusIconImage from '../assets/plus_icon.png';

import EditImage from '../assets/edit.png';
import BackButtonImage from '../assets/back.png';
import SaveButtonImage from '../assets/save.png';
import ReturnButtonImage from '../assets/x.png';
import WebHeader from './webHeader.jsx';
import PersonImg from '../assets/ProfilePic.svg';

import {
    // Header
    Header, PageTitle,
    // Button
    SubmitBtnPattern,
    // Other
    DialogBoxArea
} from './EmotionForWeb.jsx';

const lineSize = '2.5px';

function WebpatientData() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [contentList, setContentList] = useState([]);
    const [newContent, setNewContent] = useState({ date: '', content: '' });
    const [editContentIndex, setEditContentIndex] = useState(-1);
    const [saveMsg, setSaveMsg] = useState('本当に保存しますか？');
    const IpAddress = 'http://54.91.203.105:8080'
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [sended, setSended] = useState(false);

    const [patientData, setPatientData] = useState({
        PersonImg: '',
        Fullname: '',
        Age: '',
        Birthday: '',
        DisabilityType: '',
        DisabilityLevel: '',
        Hospital: '',
        Doctor: '',
        PersonContact: '',
        EmergencyContact: '',
        Address: '',
        Medicine: '',
        DoctorMessage: ''
    });

    // データをとる
    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    // const response = await axios.get(`http://localhost:8080/users/${userId}`);
                    const response = await axios.get(`${IpAddress}/users/${userId}`);
                    const data = response.data;
                    setPatientData({
                        PersonImg: data.photo || '',
                        Fullname: data.user_name || '',
                        Age: data.age || '',
                        Birthday: data.birth_date || '',
                        DisabilityType: data.specialty || '',
                        DisabilityLevel: data.disability_grade || '',
                        Hospital: data.hospital_destination || '',
                        Doctor: data.primary_care_doctor || '',
                        PersonContact: data.contact || '',
                        EmergencyContact: data.emergency_contacts[0]?.phone || '',
                        Address: data.address || '',
                        Medicine: data.medication_status || '',
                        DoctorMessage: data.doctor_comment || ''
                    });
                    setContentList(data.historys.map(h => ({ date: h.date, content: h.memo })));
                } catch (error) {
                    console.error('Error fetching patient data:', error);
                }
            };
            fetchData();
        }
    }, [userId]);

    // 右
    const handleRightChange = (field, value) => {
        setPatientData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    // 倒れた履歴修正
    const handleCenterChange = (index, field, value) => {
        setContentList((prevData) =>
            prevData.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
            )
        );
    };

    // 倒れた履歴追加
    const handleAddContent = () => {
        if (newContent.date && newContent.content) {
            const updatedContentList = [newContent, ...contentList].sort((a, b) => new Date(b.date) - new Date(a.date));
            setContentList(updatedContentList);
            setNewContent({ date: '', content: '' });
        }
    };

    const handleSave = async () => {
        setOpen(false);
        setLoad(true);
        const userDetails = {
            medication_status: patientData.Medicine,
            doctor_comment: patientData.DoctorMessage
        };
        const historyData = contentList.map(item => ({
            date: item.date,
            memo: item.content
        }));
        try {
            setIsEditing(false);
            // await axios.put(`http://localhost:8080/users/${userId}/details`, userDetails);
            // await axios.put(`http://localhost:8080/users/${userId}/history`, historyData);
            await axios.put(`${IpAddress}/users/${userId}/details`, userDetails);
            await axios.put(`${IpAddress}/users/${userId}/history`, historyData);
            setSaveMsg('データが保存されました');
            setSended(true);
        } catch (error) {
            setSaveMsg('保存に失敗しました');
        }
    };


    return (
        <>
            <Dialog open={load} onClose={() => setLoad(false)}>
                <DialogBoxArea>
                    <DialogTitle>注意</DialogTitle>
                    <DialogContent className='DialogContentStyle'>
                        {!sended ? (
                            <Box className={css`text-align: center; margin:10px; `}>
                                <CircularProgress color="inherit" />
                            </Box>
                        ) : (
                            <>
                                <h2>{saveMsg}</h2>
                                <SubmitBtn onClick={() => setLoad(false)}>OK</SubmitBtn>
                            </>
                        )}
                    </DialogContent >
                </DialogBoxArea>
            </Dialog >


            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogBoxArea>
                    <DialogTitle>注意</DialogTitle>
                    <DialogContent className='DialogContentStyle'>
                        <h2>本当に保存しますか？</h2>
                        <SubmitBtn onClick={handleSave}>OK</SubmitBtn>
                    </DialogContent >
                </DialogBoxArea>
            </Dialog >

            {/* Header */}
            <Header>
                <BackButtonStyled src={BackButtonImage} alt="戻る" onClick={() => navigate(-1)} />
                <WebHeader />
            </Header>

            {/* Topic */}
            <PageTitle>障がい者データ</PageTitle>

            {/* icon Btn */}
            <EditBtn>
                {isEditing && (
                    <div>
                        <IconBtn src={SaveButtonImage} alt="保存" onClick={() => setOpen(true)} />
                        <IconBtn src={ReturnButtonImage} alt="編集戻る" onClick={() => setIsEditing(false)} />
                    </div>
                )}
                {!isEditing && (
                    <IconBtn src={EditImage} alt="編集" onClick={() => setIsEditing(true)} />
                )}
            </EditBtn>

            {/* Table */}
            <ContainerStyle>
                {/* Left */}
                <LeftData>
                    <Person_img src={patientData.PersonImg || PersonImg} alt="患者画像" />
                    <InfoLeftData>
                        <tr>
                            <th>名前 :</th>
                            <td>{patientData.Fullname}</td>
                        </tr>
                        <tr>
                            <th>年齢 :</th>
                            <td>{patientData.Age}</td>
                        </tr>
                        <tr>
                            <th>生年月日 :</th>
                            <td>{patientData.Birthday}</td>
                        </tr>
                        <tr>
                            <th>障がい種別 :</th>
                            <td>{patientData.DisabilityType}</td>
                        </tr>
                        <tr>
                            <th>障がい者等級 :</th>
                            <td>{patientData.DisabilityLevel}</td>
                        </tr>
                        <tr>
                            <th>かかりつけ医 :</th>
                            <td>{patientData.Doctor}</td>
                        </tr>
                        <tr>
                            <th>かかりつけ病院 :</th>
                            <td>{patientData.Hospital}</td>
                        </tr>
                        <tr>
                            <th>本人連絡先 :</th>
                            <td>{patientData.PersonContact}</td>
                        </tr>
                        <tr>
                            <th>緊急連絡先 :</th>
                            <td>{patientData.EmergencyContact}</td>
                        </tr>
                        <tr>
                            <th>住所 :</th>
                            <td>{patientData.Address}</td>

                        </tr>
                    </InfoLeftData>
                </LeftData>

                {/* Main */}
                <InfoCenterData>
                    {/* Add bar */}
                    <DateContentStyle>
                        {isEditing ? (
                            <>
                                <input
                                    type="date"
                                    value={newContent.date}
                                    onChange={(e) => setNewContent({ ...newContent, date: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="内容"
                                    className={css`width:400px;`}
                                    value={newContent.content}
                                    onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                                />
                                <PlusIconStyled src={PlusIconImage} alt="追加" onClick={handleAddContent} />
                            </>
                        ) : (
                            <>
                                <Title>倒れた履歴</Title>
                            </>
                        )}
                    </DateContentStyle>


                    {/* List Item */}
                    <ContentListStyle>
                        {contentList.map((item, index) => (
                            <InfoCenterDataItem key={index}>
                                {editContentIndex === index ? (
                                    <>
                                        <input
                                            type="date"
                                            value={item.date}
                                            onChange={(e) => handleCenterChange(index, 'date', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            value={item.content}
                                            onChange={(e) => handleCenterChange(index, 'content', e.target.value)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <span>{item.date}</span>
                                        <p>{item.content}</p>
                                    </>
                                )}
                                {isEditing ? (
                                    <div>
                                        <button
                                            onClick={() => setEditContentIndex(editContentIndex === index ? -1 : index)}
                                            className={css`margin-right: 20px;`}
                                        >
                                            編集</button>
                                    </div>
                                ) : (<div></div>)}
                            </InfoCenterDataItem>
                        ))}
                    </ContentListStyle>


                </InfoCenterData>

                {/* Right */}
                <InfoRightData>
                    <p>使用中の薬：</p>
                    {isEditing ? (
                        <InfoRightDataAreaInput
                            type="text"
                            value={patientData.Medicine}
                            onChange={(e) => handleRightChange('Medicine', e.target.value)}
                        />
                    ) : (
                        <InfoRightDataArea>{patientData.Medicine}</InfoRightDataArea>
                    )}

                    {/* Line */}

                    <SplitLine />
                    <p>主治医から：</p>
                    {isEditing ? (
                        <InfoRightDataAreaInput
                            type="text"
                            value={patientData.DoctorMessage}
                            onChange={(e) => handleRightChange('DoctorMessage', e.target.value)}
                        />
                    ) : (
                        <InfoRightDataArea>{patientData.DoctorMessage}</InfoRightDataArea>
                    )}
                </InfoRightData>
            </ContainerStyle>
        </>
    );
}

export default WebpatientData;

const BackButtonStyled = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
`;

const ContainerStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 85%;
  border: ${lineSize} solid #000;
  border-radius: 15px;
  margin: 0 auto;
`;

const LeftData = styled.div`
  border-right: ${lineSize} solid #000;
  width: 400px;
  text-align: center;
  padding: 10px;
`;

const Person_img = styled.img`
  width: 200px;
  margin: 10px 0;
`;

const DateContentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${lineSize} solid #000;
  padding-top: 10px;
  padding-bottom: 20px;
  input {
    margin: 0 5px;
    padding: 5px;
    font-size: 1em;
  }
`;

const ContentListStyle = styled.table`
  list-style-type: none;
  padding: 0;
`;

const InfoLeftData = styled.div`
  text-align: left;
  border:none;
  padding: 5px;
  th{
    padding: 3px 15px 3px 0;
    width:40%;
  }
  p {
    margin: 0;
    padding: 10px;
  }
`;

///-----------------------------------------Center-------------------------------------------------------

const InfoCenterData = styled.div`
  text-align: center;
  padding: 10px;
`;

const PlusIconStyled = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const InfoCenterDataItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: ${lineSize} solid #000;
  padding: 10px 0;
  height:100%;
  width:700px;
  text-align: left;
  span {
    margin-left: 20px;
    margin-right:50px;
  }
`;



///----------------------------------------------------Right---------------------------------------------------------------

const InfoRightData = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  border-left: ${lineSize} solid #000;
  p{
    padding: 10px;
  }
`;

const InfoRightDataArea = styled.div`
    height:90%;
    width:90%;
    display: flex;
    align-items: center;
    padding: 10px;
`;

const InfoRightDataAreaInput = styled.input`
    height:90%;
    width:90%;
    display: flex;
    align-items: center;
    margin: 10px auto;
`;

const SplitLine = styled.div`
  border-bottom: ${lineSize} solid #000;
`

const Title = styled.h2`
    text-align: center;
    margin: 0 auto;
`

const EditBtn = styled.div`
  display: grid;
  justify-content:end;
  width:92%;
  margin-bottom:10px
`;

const IconBtn = styled.img`
    width: 30px;
    height: 30px;
    margin:0 10px;
`

const SubmitBtn = styled.button`
      border: 1px solid #000;
      color: #000;
      margin: 5% auto 0 auto;
      ${SubmitBtnPattern}
    `;
