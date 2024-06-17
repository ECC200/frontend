import { useState } from 'react';
import styled from '@emotion/styled';
import Logo from '../LogoSetup';
import { Global, css } from '@emotion/react'

function Level1() {
  const id = "1A2B";
  const [isModalOpen, setModalOpen] = useState(false);
  const emergencyContacts = [
    { href: 'tel:' +/*emergencycontact*/'', text: '母携帯' },
    { href: 'tel:' +/*workcontact*/'', text: '勤務先' },
  ];


  const handleReport = () => {
    window.location.href = 'tel:119';//119
  };

  const handleEmergencyContact = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Global
        styles={css`
            body {
              background-color: #B22222;
            }
        `} />
      <AppContainer>
        {/* Main */}
        <CareConnect>
          <Logo color='#fff' />
          <NumberSet>
            <NumberItem>患者番号:</NumberItem>
            <Number>{id}</Number>
          </NumberSet>
          <Button onClick={handleReport}>119</Button>
          <Button onClick={handleEmergencyContact}>緊急連絡先</Button>
        </CareConnect>

        {/* 緊急連絡人Menu */}
        {isModalOpen && (
          <Modal>
            <ModalContent>
              <h2>どこに連絡しますか？</h2>
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
    </>

  );
}

export default Level1;

const AppContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #B22222;
`;

const CareConnect = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  color: white;
    padding: 3vh 3.5vh 0 3.5vh;
`;

const NumberSet = styled.div`
  text-align: center;
  margin: 1vh 0;
  padding: 0;
`
const NumberItem = styled.p`
    margin-bottom: -10px;
    padding: 0;
    font-size: 1em;
`;
const Number = styled.p`
  margin: -2vh 0 0 0;
  padding: 0;
  font-size: 8vh;
`;

const Button = styled.button`
  font-size: 2em;
  padding: 15px 30px; /* 大きめのパディング */
  margin: 15px 0; /* 大きめのマージン */
  width:250px;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: black;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  a{
    text-decoration: none;
    font-size:1.5em;
  }
`;