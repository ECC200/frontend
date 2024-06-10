import { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import Logo from './LogoWeb';
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
            <ShowTime>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</ShowTime>
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
                    <InfoRightItem>Staff No: {StaffData.StaffNO}</InfoRightItem>
                    <InfoRightItem>Mangement Level: {StaffData.MangementLevel}</InfoRightItem>
                    <InfoRightItem>Work Status: {StaffData.WorkStatus}</InfoRightItem>
                    <InfoRightItem>Disability Level: {StaffData.DisabilityLevel}</InfoRightItem>
                    <InfoRightItem>Superior: {StaffData.Superior}</InfoRightItem>
                    <InfoRightMessageItem>Message: </InfoRightMessageItem>
                    <InfoRightMessage>{StaffData.Message}</InfoRightMessage>
                </InfoRightPart>
            </DataTable>
        </>
    );
}
export default WebStaffData;

const DataTable = styled.div`
        display: grid;
        grid-template-columns: auto auto;
        padding: 1px;
        margin: 0 auto;
        width: 70%;
        border: 2px solid #000;
        border-radius: 15px;
    `
// Left
const InfoLeftPart = styled.div`
        flex-direction: column;
        grid-column: 1 / span 2;
        text-align: center;
        img{
            width: 200px;
            padding:5%;
        }
    `
const InfoLeftData = styled.div`
        flex-direction: column;
        padding:3%;
        color: #000;
    `
const InfoLeftDataItem = styled.p`
        font-size:1.3em;
        margin:0;
    `

// Right
const InfoRightPart = styled.div`
        border-left:1px solid #000;
        grid-column: 3 / span 10;
        text-align: left;
        color: #000;
    `
const InfoRightItem = styled.div`
        padding: 1%;
        border-bottom: 1px solid #000;
        font-size:1.3em;
    `
const InfoRightMessageItem = styled.div`
        font-size:1.3em;
        padding: 1%;
    `
const InfoRightMessage = styled.div`
        font-size:1.3em;
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
    `