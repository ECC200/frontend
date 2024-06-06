import styled from '@emotion/styled';
import Logofunc from "../LogoSetup";



const CareConnect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:red;
`;


const Id = styled.div`
  font-size: 2em;
  margin: 20px 0;
`;

const Button = styled.button`
  font-size: 1.2em;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  color: black;
`;

function Level1() {
  const id = "1A2B"; // ここに実際の障がい者番号を設定

  return (
    <CareConnect>
      <Logofunc />

      <Id>{id}</Id>
      <Button>通報</Button>
      <Button>緊急連絡人</Button>
    </CareConnect>
  );
}

export default Level1;
