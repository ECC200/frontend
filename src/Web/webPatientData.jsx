import { useState } from 'react';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PlusIconImage from '../assets/plus_icon.png';
import personImg from '../assets/taku.jpeg';
import EditImage from '../assets/edit.png';
import BackButtonImage from '../assets/back.png';
import SaveButtonImage from '../assets/save.png';
import ReturnButtonImage from '../assets/x.png';
import WebHeader from './webHeader.jsx';
import {
    // Header
    Header, PageTitle,

    // Button
    SubmitBtnPattern,
} from './EmotionForWeb.jsx'

const lineSize = '2.5px';

function WebpatientData() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false); // 編集状態のフラグ
    const [contentList, setContentList] = useState([{ date: '2023-08-16', content: '定期健診、ビムパット50mg追加' }]);
    const [newContent, setNewContent] = useState({ date: '', content: '' });
    const [editContentIndex, setEditContentIndex] = useState(-1);
    const [saveMsg, setSaveMsg] = useState('本当に保存しますか？');
    const [saveMsgTitle, setSaveMsgTitle] = useState('注意');
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [sended, setSended] = useState(false);

    const [patientData, setPatientData] = useState({
        photo: '',
        user_name: '岸本 たく',
        age: '20',
        birth_date: '2003-08-30',
        specialty: '何科',
        disability_grade: '障がい者等級',
        hospital_destination: 'かかりつけ病院',
        chronicDisease: '持病名',
        primary_care_doctor: '担当医',
        contact: '080-3860-1577',
        emergency_contacts: '0120-333-906',
        address: '大阪府吹田市春日4-7-1-310',
        Medicine: 'デパケン',
        DoctorMessage: 'がんばってねー'
    });

    const handleRightChange = (field, value) => {
        setPatientData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleCenterChange = (index, field, value) => {
        setContentList((prevData) =>
            prevData.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handleAddContent = () => {
        if (newContent.date && newContent.content) {
            const updatedContentList = [newContent, ...contentList].sort((a, b) => new Date(b.date) - new Date(a.date));
            setContentList(updatedContentList);
            setNewContent({ date: '', content: '' });
        }
    };

    const handleSave = () => {
        setLoad(true);

        // ApI

        setTimeout(() => {
            setSended(true);
            setSaveMsgTitle('成功');
            setSaveMsg('データが保存されました');
            setIsEditing(false);

            // Error
            // setSaveMsg('保存に失敗しました');
            // setSended(false);
        }, 2000);

        setSaveMsg('本当に保存しますか？');
        setSaveMsgTitle('注意');
    };

    return (
        <>
            {load ? (
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle className={css`text-align: center;`}>{saveMsgTitle}</DialogTitle>
                    <DialogContent className={css`width:600px;text-align: center;`}>
                        {!sended ? (
                            <Box className={css`text-align: center; margin:10px; `}>
                                <CircularProgress color="inherit" />
                            </Box>
                        ) : (
                            <>
                                <h2>{saveMsg}</h2>
                                <SubmitBtn onClick={() => setOpen(false)}>OK</SubmitBtn>
                            </>
                        )}
                    </DialogContent >
                </Dialog >
            ) : (
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle className={css`text-align: center;`}>{saveMsgTitle}</DialogTitle>
                    <DialogContent className={css`width:600px;text-align: center;`}>
                        <h2>{saveMsg}</h2>
                        <SubmitBtn onClick={handleSave}>OK</SubmitBtn>
                    </DialogContent >
                </Dialog >
            )}


            <Header>
                <BackButtonStyled src={BackButtonImage} alt="戻る" onClick={() => navigate(-1)} />
                <WebHeader />
            </Header>

            <PageTitle>障がい者データ</PageTitle>

            <EditBtn>
                {isEditing && (
                    <div className={css`display:flex;`}>
                        <img src={SaveButtonImage} alt="保存" onClick={() => setOpen(true)} className={css`width: 30px;height: 30px;margin:0 10px;`} />
                        <img src={ReturnButtonImage} alt="編集戻る" onClick={() => setIsEditing(false)} className={css`width: 30px;height: 30px;margin:0 10px;`} />
                    </div>
                )}
                {!isEditing && (
                    <img src={EditImage} alt="編集" onClick={() => setIsEditing(true)} className={css`width: 30px;height: 30px;`} />
                )}
            </EditBtn>

            {/* Table */}
            <ContainerStyle>
                {/* Left */}
                <LeftStyle>
                    <Person_img src={personImg} alt="患者画像" />
                    <InfoLeftData>
                        <tr>
                            <th>名前 :</th>
                            <td>{patientData.user_name}</td>
                        </tr>
                        <tr>
                            <th>年齢 :</th>
                            <td>{patientData.age}</td>
                        </tr>
                        <tr>
                            <th>生年月日 :</th>
                            <td>{patientData.birth_date}</td>
                        </tr>
                        <tr>
                            <th>何科 :</th>
                            <td>{patientData.specialty}</td>
                        </tr>
                        <tr>
                            <th>持病名 :</th>
                            <td>{patientData.chronicDisease}</td>
                        </tr>
                        <tr>
                            <th>障がい者等級 :</th>
                            <td>{patientData.disability_grade}</td>
                        </tr>
                        <tr>
                            <th>主治医 :</th>
                            <td>{patientData.primary_care_doctor}</td>
                        </tr>
                        <tr>
                            <th>かかりつけ病院 :</th>
                            <td>{patientData.hospital_destination}</td>
                        </tr>
                        <tr>
                            <th>本人連絡先 :</th>
                            <td>{patientData.contact}</td>
                        </tr>
                        <tr>
                            <th>緊急連絡先 :</th>
                            <td>{patientData.emergency_contacts}</td>
                        </tr>
                        <tr>
                            <th>住所 :</th>
                            <td>{patientData.address}</td>
                        </tr>
                    </InfoLeftData>
                </LeftStyle>

                {/* Main */}
                <InfoCenterData>
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
                                        <InfoCenterDataItemDetailInput
                                            type="text"
                                            value={item.content}
                                            onChange={(e) => handleCenterChange(index, 'content', e.target.value)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <span>{item.date}</span>
                                        <InfoCenterDataItemDetail>{item.content}</InfoCenterDataItemDetail>
                                    </>
                                )}
                                <button
                                    onClick={() => setEditContentIndex(editContentIndex === index ? -1 : index)}
                                    className={css`margin-right: 20px;`}
                                >
                                    編集</button>
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

const LeftStyle = styled.div`
  border-right: ${lineSize} solid #000;
  width: 380px;
  text-align: center;
  padding: 10px;
`;

const Person_img = styled.img`
  width: 150px;
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
    padding: 3px 0;
  }
  th{
     padding-right: 15px;
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
  width:100%;
  span {
    margin-left: 20px;
    margin-right:50px;
  }
`;

const InfoCenterDataItemDetail = styled.p`
    height: 100%;
    width: 430px;
    text-align: left;
`

const InfoCenterDataItemDetailInput = styled.input`
    height: 100%;
    width: 430px;
    text-align: left;
`

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
///--------------------------------------------------------------------

const EditBtn = styled.div`
  display: grid;
  justify-content:end;
  width:92%;
`;


const SubmitBtn = styled.button`
      border: 1px solid #000;
      color: #000;
      margin: 5% auto 0 auto;
      ${SubmitBtnPattern}
    `;
