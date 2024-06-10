import styled from '@emotion/styled';
import Logo from './LogoWeb';
import Testimg from '../assets/螢幕截圖 2024-06-06 11.22.29.png'

function WebStaffData() {
    const StaffData = {
        Fullname: '#Fullname#', Department: '#Department#', Position: '#Position#', DateOfJoining: '#DateOfJoining#',
        StaffNO: '#StaffNO#', MangementLevel: '#MangementLevel#', WorkStatus: '#WorkStatus#', DisabilityLevel: '#DisabilityLevel#',
        Message: '#Message#'
    }
    return (
        <>
            <Logo />
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
        border: 1px solid #000;
        border-radius: 15px:
    `
const InfoLeftPart = styled.div`
        flex-direction: column;
        grid-column: 1 / span 2;
        text-align: center;
        img{
            width: 100px;
            padding:3%;
        }
    `
const InfoLeftData = styled.div`
        flex-direction: column;
        padding:3%;
        color: #000;
    `
const InfoLeftDataItem = styled.p`
        font-size:20px;
        margin:0;
    `
const InfoRightPart = styled.div`
        border-left:1px solid #000;
        grid-column: 3 / span 10;
        text-align: left;
        color: #000;
        img{
            width: 20%;
            padding:3%;
        }
    `
const InfoRightItem = styled.div`
        padding: 1%;
        border-bottom: 1px solid #000;
    `
const InfoRightMessageItem = styled.div`
        padding: 1%;

    `
const InfoRightMessage = styled.div`
        padding: 0 1%;
    `