import { useState } from 'react';
import styled from '@emotion/styled';
import Logo from '../LogoSetup';

const AppContainer = styled.div`
  text-align: center;
  background-color: #B22222;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CareConnect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 2em; /* 大きめのフォントサイズ */
`;

const Id_txt = styled.div`
  font-size: 0.7em; /* 大きめのフォントサイズ */
  `;

const Id = styled.div`
  font-size: 2em; /* 大きめのフォントサイズ */
  margin: 0px 10px 40px 10px;
`;



const Button = styled.button`
  font-size: 1em; /* 大きめのフォントサイズ */
  padding: 15px 30px; /* 大きめのパディング */
  margin: 15px 0; /* 大きめのマージン */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  color: black;
`;

const StyledLogo = styled(Logo)`
  width: 200px; /* 大きめの幅 */
  height: auto; /* 高さは自動調整 */
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: black; /* フォントカラーを黒に変更 */
  margin: auto;
`;

const ModalButton = styled.button`
  font-size: 1em;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #B22222;
  color: white;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

const LinkItem = styled.li`
  margin: 15px 0;
`;

function Level1() {
  const id = "1A2B";//患者番号を持ってくる
  const [isModalOpen, setModalOpen] = useState(false);

  const emergencyContacts = [
    { href: 'tel:'+/*emergencycontact*/'', text: '母携帯' },
    { href: 'tel:'+/*workcontact*/'', text: '勤務先' },
  ];


  const handleReport = () => {
    window.location.href = 'tel:119';//119
  };

  const handleEmergencyContact = () => {
    setModalOpen(true);
  };

  

  return (
    <AppContainer>
      <CareConnect>
        <StyledLogo />
        <Id_txt>患者番号:</Id_txt>
        <Id>{id}</Id>
        <Button onClick={handleReport}>119</Button>
        <Button onClick={handleEmergencyContact}>緊急連絡先</Button>
      </CareConnect>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <p>どこに連絡しますか？</p>
            <LinkList>
              {emergencyContacts.map((contact, index) => (
                <LinkItem key={index}>
                  <a href={contact.href}>{contact.text}</a>
                </LinkItem>
              ))}
            </LinkList>
            <ModalButton onClick={() => setModalOpen(false)}>閉じる</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </AppContainer>
  );
}

export default Level1;
