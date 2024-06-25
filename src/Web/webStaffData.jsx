import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { Axios } from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import Logofunc from '../LogoSetup';
import TestImg from '../assets/螢幕截圖 2024-06-06 11.22.29.png'



function WebStaffData() {
    const StaffID = '#'
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isInactive, setIsInactive] = useState(false);
    const timeoutRef = useRef(null);
    const [searchbar, setSearchbar] = useState('')
    const [searchRsp, setSearchRsp] = useState(["asdasdsa", "asdasdsad", "asdadsad"]);


    const StaffData = {
        FullName: '#FullName#', Department: '#Department#', Position: '#Position#', DateOfJoining: '#DateOfJoining#',
        StaffNO: '#StaffNO#', ManagementLevel: '#ManagementLevel#', WorkStatus: '#WorkStatus#', Superior: '#superior#',
        Message: '#Message#'
    }


    // 5分
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

    const handleReLogin = () => {
        const dataForReLogin = { FullName: '#FullName#', StaffID: StaffID }
        navigate("/webStaffReLogin/", { state: dataForReLogin });
    };

    // 時間
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 検索
    const HandleSearch = useCallback(async (e) => {
        setSearchbar(e.target.value);
        ///----------API------------------
        const response = await Axios.get('localhost:8080');
        if (response.statusCode === 200) {
            setSearchRsp();
        }
        ///--------------------------------
    }, []);

    if (!isInactive) {
        return (
            <>
                <Dialog Dialog open={open} onClose={() => setOpen(false)}>
                    <Testasd>
                        <DialogTitle>検索結果</DialogTitle>
                        <DialogContent className='DialogContentStyle'>
                            {searchRsp.map((repo) => (
                                <div key={repo.name}>
                                    <h4>{searchRsp}</h4>
                                </div>
                            ))}
                        </DialogContent>
                    </Testasd>
                </Dialog >

                <Header>
                    {time.getSeconds() > 9 ?
                        (<ShowTime><h2>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</h2></ShowTime>)
                        :
                        (<ShowTime><h2>{time.getHours()}:{time.getMinutes()}:0{time.getSeconds()}</h2></ShowTime>)
                    }

                    <HeaderRight>
                        <SearchBarArea>
                            <SearchBar type='text' id='searchbar' value={searchbar} onChange={HandleSearch} />
                            <SearchBarBtn type='submit' onClick={() => setOpen(true)}>検索</SearchBarBtn>
                        </SearchBarArea>

                        <SignUpBtn onClick={() => navigate("/webDisSignUp/")}>新規登録</SignUpBtn>
                    </HeaderRight>
                </Header>


                <Logofunc />

                <DataTable>
                    <InfoLeftPart>
                        <img src={TestImg} alt="Icon" />
                        <InfoLeftData>
                            <InfoLeftDataItem>{StaffData.FullName}</InfoLeftDataItem>
                            <InfoLeftDataItem>{StaffData.Department}</InfoLeftDataItem>
                            <InfoLeftDataItem>{StaffData.Position}</InfoLeftDataItem>
                            <InfoLeftDataItem>{StaffData.DateOfJoining}</InfoLeftDataItem>
                        </InfoLeftData>
                    </InfoLeftPart>

                    <InfoRightPart>
                        <InfoRightItem>スタッフ番号： {StaffData.StaffNO}</InfoRightItem>
                        <InfoRightItem>管理レベル： {StaffData.ManagementLevel}</InfoRightItem>
                        <InfoRightItem>勤務状況： {StaffData.WorkStatus}</InfoRightItem>
                        <InfoRightItem>上司： {StaffData.Superior}</InfoRightItem>
                        <InfoRightMessageItem>メッセージ： </InfoRightMessageItem>
                        <InfoRightMessage>{StaffData.Message}</InfoRightMessage>
                    </InfoRightPart>
                </DataTable>
            </>
        );
    } else {
        handleReLogin()
    }
}
export default WebStaffData;



const lineSize = '2.5px';
const fontSize = '1.3em';

// --------------------------------------------Header----------------------------------------------------
const Header = styled.header`
    margin: 1% 0 0.5% 0;
    display: flex;
    align-items: center;
    justify-content:space-between;
`
// Time 
const ShowTime = styled.div`
    margin-left: 10%;
    color: #000;
    letter-spacing: 1.7px;
`
const HeaderRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 70%;
`
// ----------------------SearchBar----------------------
const SearchBarArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:end;
    align-items: center;
    width: 75%;
`
const SearchBar = styled.input`
    width: 300px;
    height: 30px;
    margin: 0 2%;
    border: 2px solid black;
    border-radius: 5px;
`
const SearchBarBtn = styled.button`
    font-size:16px;
    width:75px;
    height:30px;
    border-radius: 5px;
`
// --------------------------------------------
const SignUpBtn = styled.button`
    background-color: #fff;
    border-radius: 5px;
    font-size:16px;
    font-weight:bold;
    text-align:center;
    margin: 0 5%;
    padding:1% 1.5%;
    letter-spacing:5px;
`

// ------------------------------------------------------------------------------------------------


// --------------------------------------------Table----------------------------------------------------
const DataTable = styled.div`
        display: grid;
        grid-template-columns: auto auto;
        margin: 25px auto;
        width: 70%;
        border: ${lineSize} solid #000;
        border-radius: 15px;
    `
// Left
const InfoLeftPart = styled.div`
        grid-column: 1 / span 2;
        flex-direction: column;
        text-align: center;
        margin-top: 3%;
        img{
            width: 250px;
            padding:5%;
        }
    `
const InfoLeftData = styled.div`
        flex-direction: column;
        padding:3%;
        color: #000;
    `
const InfoLeftDataItem = styled.p`
        font-size: ${fontSize};
        padding: 1% 0;
        margin:0;
    `
// Right
const InfoRightPart = styled.div`
        border-left: ${lineSize} solid #000;
        grid-column: 3 / span 10;
        text-align: left;
        color: #000;
    `
const InfoRightItem = styled.div`
        padding: 0.75% 1%;
        border-bottom: ${lineSize} solid #000;
        font-size:${fontSize};
    `
const InfoRightMessageItem = styled.div`
        font-size:${fontSize};
        padding: 1%;
    `
const InfoRightMessage = styled.div`
        font-size: ${fontSize};
        padding: 0 1% 2% 1%;
        height: 300px;
    `
// ------------------------------------------------------------------------------------------------


const Testasd = styled.div`
width:1000px;
`
// ------------------------------------------------------------------------------------------------
