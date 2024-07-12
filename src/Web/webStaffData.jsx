import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import WebHeader from './webHeader.jsx';
import styled from '@emotion/styled';
import { css } from "@emotion/css";
import PersonImg from '../assets/taku.jpeg';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import {
    Header, DialogBoxArea
} from './EmotionForWeb.jsx'

function WebStaffData() {
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [logout, setLogout] = useState(false);
    const [isInactive, setIsInactive] = useState(false);
    const timeoutRef = useRef(null);
    const [confirm, setConfirm] = useState(false);
    const [searchbar, setSearchbar] = useState('');
    const searchRsp = 'No matching records found';
    const [staffData, setStaffData] = useState({
        staff_name: "",
        boss: "",
        date: "",
        department: "",
        doctor_message: "",
        password: "",
        position: "",
        staff_id: "",
        work_status: ""
    });

    const resetTimer = () => {
        setIsInactive(false);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsInactive(true);
        }, 300000);
    };

    useEffect(() => {
        const handleActivity = () => resetTimer();
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('scroll', handleActivity);
        resetTimer();
        return () => {
            clearTimeout(timeoutRef.current);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('scroll', handleActivity);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/staffs/${staffId}`);
                setStaffData(response.data);
            } catch (error) {
                console.error("Error fetching staff data:", error);
            }
        };
        fetchData();
    }, [staffId]);

    const handleReLogin = () => {
        if (staffData) {
            const dataForReLogin = { FullName: staffData.FullName, StaffID: staffId };
            navigate("/webStaffReLogin/", { state: dataForReLogin });
        }
    };

    const handleLogout = () => {
        setLogout(true);
    };

    // Time Now
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Search bar Api
    const handleSearch = useCallback(async () => {
        setConfirm(false)
        if (searchbar !== '') {
            setOpen(true);
            try {
                await axios.post('http://localhost:8080/checkDisabilityID', { disabilityId: searchbar });
                setTimeout(() => {
                    navigate(`/WebPatientData/${searchbar}`);
                }, 1000);
            } catch (error) {
                setConfirm(true)
                console.error('Error searching disability ID:', error);
            }
        }
    }, [navigate, searchbar]);


    if (isInactive) {
        handleReLogin();
        return null;
    }

    return (
        <>
            {/* Search Confirm Msg Box */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogBoxArea>
                    <DialogTitle>検索結果</DialogTitle>
                    <DialogContent className='DialogContentStyle'>
                        {confirm ? (
                            <h3>{searchRsp}</h3>
                        ) : (
                            <Box className={css`text-align: center; margin:10px;`}>
                                <CircularProgress color="inherit" />
                            </Box>
                        )}
                    </DialogContent>
                </DialogBoxArea>
            </Dialog >

            {/* Logout Confirm Msg Box */}
            <Dialog Dialog open={logout} onClose={() => setLogout(false)}>
                <DialogBoxArea>
                    <DialogTitle>ログアウト確認</DialogTitle>
                    <DialogContent className='DialogContentStyle'>
                        <h3>本当にログアウトをしますか？</h3>
                        <SubmitBtn onClick={() => navigate("/WebLogin/")}>ログアウト</SubmitBtn>
                    </DialogContent>
                </DialogBoxArea>
            </Dialog>

            <Header>
                {time.getSeconds() > 9 ?
                    (<ShowTime><h2>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</h2></ShowTime>) :
                    (<ShowTime><h2>{time.getHours()}:{time.getMinutes()}:0{time.getSeconds()}</h2></ShowTime>)
                }
                <WebHeader />
                <HeaderRigjht>
                    <HeaderBtn onClick={() => navigate("/webDisSignUp/")}>障がい者新規登録</HeaderBtn>
                    <HeaderBtn onClick={handleLogout}>ログアウト</HeaderBtn>
                </HeaderRigjht>
            </Header>


            <PageTitle>おはようございます</PageTitle>

            <SearchBarArea>
                <h3>障がい者検索：</h3>
                <SearchBar type='text' id='searchbar' value={searchbar} onChange={(e) => setSearchbar(e.target.value)} />
                <SearchBarBtn type='submit' onClick={handleSearch}>検索</SearchBarBtn>
            </SearchBarArea>

            <DataTable>
                <InfoLeftPart>
                    <img src={PersonImg} alt="Icon" />
                    <InfoLeftData>
                        <InfoLeftDataItem>氏名: {staffData.staff_name}</InfoLeftDataItem>
                        <InfoLeftDataItem>部署: {staffData.department}</InfoLeftDataItem>
                        <InfoLeftDataItem>役職: {staffData.position}</InfoLeftDataItem>
                        <InfoLeftDataItem>入社日: {staffData.date}</InfoLeftDataItem>
                    </InfoLeftData>
                </InfoLeftPart>

                <InfoRightPart>
                    <InfoRightItem>社員番号: {staffData.staff_id}</InfoRightItem>
                    <InfoRightItem>勤務状況: {staffData.work_status}</InfoRightItem>
                    <InfoRightItem>上司: {staffData.boss}</InfoRightItem>
                    <InfoRightMessageItem>メッセージ:</InfoRightMessageItem>
                    <InfoRightMessage>{staffData.doctor_message}</InfoRightMessage>
                </InfoRightPart>
            </DataTable>
        </>
    );
}

export default WebStaffData;

const lineSize = '2.5px';
const fontSize = '1.3em';

// --------------------------------------------Header----------------------------------------------------




const ShowTime = styled.div`
    position: absolute;
    margin-left: 10%;
    color: #fff;
    letter-spacing: 1.7px;

`;
// ----------------------SearchBar----------------------
const SearchBarArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    margin: 15px 0 50px 0;

`;
const SearchBar = styled.input`
    width: 300px;
    height: 30px;
    margin-right:15px;
    border: 2px solid black;
    border-radius: 5px;
`;
const SearchBarBtn = styled.button`
    font-size:16px;
    width:75px;
    height:30px;
    border-radius: 5px;
`;
// --------------------------------------------
const HeaderBtn = styled.button`
    background-color: #fff;
    border-radius: 5px;
    font-size: 16px;
    font-weight:bold;
    text-align:center;
    padding:5px 10px;
    margin: 0 10px;
    letter-spacing:3px;

`;
// ------------------------------------------------------------------------------------------------


// --------------------------------------------Table----------------------------------------------------
const DataTable = styled.div`

    display: grid;
    grid-template-columns: auto auto;
    margin: 25px auto;
    width: 75%;
    border: ${lineSize} solid #000;
    border-radius: 15px;
`;
// Left
const InfoLeftPart = styled.div`
    grid-column: 1 / span 2;
    flex-direction: column;
    text-align: center;
    margin-top: 3%;
    img{
        width: 200px;
        padding:5%;
    }
`;
const InfoLeftData = styled.div`
    flex-direction: column;
    padding:3%;
    color: #000;
`;
const InfoLeftDataItem = styled.p`
    font-size: ${fontSize};
    padding: 1% 0;
    margin:0;
`;
// Right
const InfoRightPart = styled.div`
    border-left: ${lineSize} solid #000;
    grid-column: 3 / span 10;
    text-align: left;
    color: #000;
`;
const InfoRightItem = styled.div`
    padding: 0.75% 1%;
    border-bottom: ${lineSize} solid #000;
    font-size:${fontSize};
`;
const InfoRightMessageItem = styled.div`
    font-size:${fontSize};
    padding: 1%;
`;
const InfoRightMessage = styled.div`
    font-size: ${fontSize};
    padding: 0 1% 2% 1%;
    height: 300px;
`;

// ------------------------------------------------------------------------------------------------
const PageTitle = styled.h1`
    text-align: center;
    margin:35px 0;
    font-size:40px;
`;
const HeaderRigjht = styled.div`
    width:90%;
    position:absolute;
    text-align:center;
    display:flex;
    justify-content:end;
`;
const SubmitBtn = styled.button`
    border: 1px solid #000;
    background-color: transparent;
    border-radius: 20px;
    color: #000;
    font-size: 100%;
    font-weight: bold;
    letter-spacing: 5px;
    margin: 0 auto;
    margin-top: 5%;
    padding: 10px 20px;
    text-transform: uppercase;
    cursor: pointer;
`;