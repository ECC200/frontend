import { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import Logo from '../LogoSetup';
import Testimg from '../assets/螢幕截圖 2024-06-06 11.22.29.png'


function WebStaffData() {
    const StaffData = {
        Fullname: '#Fullname#', Department: '#Department#', Position: '#Position#', DateOfJoining: '#DateOfJoining#',
        StaffNO: '#StaffNO#', MangementLevel: '#MangementLevel#', WorkStatus: '#WorkStatus#', DisabilityLevel: '#DisabilityLevel#', Superior: '#superior#',
        Message: '#Message#'
    }
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Logo />
            {time.getSeconds() > 9 ?
                (<ShowTime>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</ShowTime>)
                :
                (<ShowTime>{time.getHours()}:{time.getMinutes()}:0{time.getSeconds()}</ShowTime>)
            }
            <DataTable>
                <InfoLeftPart>
                    <img src={Testimg} alt="" />
                    <InfoLeftData>
                        <InfoLeftDataItem>{StaffData.Fullname}</InfoLeftDataItem>
                        <InfoLeftDataItem>{StaffData.Department}</InfoLeftDataItem>
                        <InfoLeftDataItem>{StaffData.Position}</InfoLeftDataItem>
                        <InfoLeftDataItem>{StaffData.DateOfJoining}</InfoLeftDataItem>
                    </InfoLeftData>
                </InfoLeftPart>

                <InfoRightPart>
                    <InfoRightItem>スタッフ番号： {StaffData.StaffNO}</InfoRightItem>
                    <InfoRightItem>管理レベル： {StaffData.MangementLevel}</InfoRightItem>
                    <InfoRightItem>勤務状況： {StaffData.WorkStatus}</InfoRightItem>
                    <InfoRightItem>障害レベル： {StaffData.DisabilityLevel}</InfoRightItem>
                    <InfoRightItem>上司： {StaffData.Superior}</InfoRightItem>
                    <InfoRightMessageItem>メッセージ： </InfoRightMessageItem>
                    <InfoRightMessage>{StaffData.Message}</InfoRightMessage>
                </InfoRightPart>
            </DataTable>
        </>
    );
}
export default WebStaffData;

const lineSize = '2.5px';
const fontSize = '1.3em';
const DataTable = styled.div`
        display: grid;
        grid-template-columns: auto auto;
        padding: 1px;
        margin: 0 auto;
        width: 70%;
        border: ${lineSize} solid #000;
        border-radius: 15px;
    `
// Left
const InfoLeftPart = styled.div`
        grid-column: 1 / span 2;
        flex-direction: column;
        text-align: center;
        margin-top: 10%;
        img{
            width: 200px;
            padding:7% 5%;
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
        padding: 1%;
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
        margin-bottom:20%;
    `
// Time 
const ShowTime = styled.h2`
        padding-right:1%;
        color: #000;
        width: 70%;
        margin: 0 auto;
        text-align: end;
        letter-spacing: 1.7px;
    `