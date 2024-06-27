import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Logo from '../LogoSetup';
import { Global, css } from '@emotion/react';
import Copie from '../assets/copie.png';

function Level1() {
  const id = "1A2B";
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const numberRef = useRef(null);

  const emergencyContacts = [
    { href: 'tel:' + /*emergencycontact*/'', text: '母携帯' },
    { href: 'tel:' + /*workcontact*/'', text: '勤務先' },
  ];

  const handleReport = () => {
    window.location.href = 'tel:119'; //119
  };

  const handleEmergencyContact = () => {
    setModalOpen(true);
  };

  const handleCopy = () => {
    const numberText = numberRef.current.innerText;
    navigator.clipboard.writeText(numberText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // 2秒後にコピー完了メッセージを非表示
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <>
      <Global
        styles={css`
          body {
            background-color: #B22222;
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      />
      <AppContainer>
        {/* Main */}
        <CareConnect>
          <Logo color='#fff' />
          <NumberItem>患者番号:</NumberItem>
          <SetNumber>
            <Number ref={numberRef}>
              {id}
              <CopieBT src={Copie} onClick={handleCopy} alt="Copy Icon" />
            </Number>
            {isCopied && <CopiedMessage>Copied!</CopiedMessage>}
          </SetNumber>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #B22222;
`;

const CopieBT = styled.img`
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 20px;
  width: 20px;
  height: 20px;
`;

const SetNumber = styled.div`
  text-align: center;
`;

const CareConnect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 3vh 3.5vh 0 3.5vh;
`;

const NumberItem = styled.p`
  margin-bottom: 10px;
  padding: 0;
  font-size: 1em;
`;

const Number = styled.p`
  margin: -2vh 0 0 0;
  padding: 0;
  font-size: 8vh;
  color: white;
  text-align: center;
`;

const Button = styled.button`
  font-size: 2em;
  padding: 15px 30px; /* 大きめのパディング */
  margin: 15px 0; /* 大きめのマージン */
  width: 250px;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: black;
`;

const CopiedMessage = styled.p`
  color: white;
  font-size: 1em;
  margin-top: 1px;
  margin-bottom: 1px;
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
  a {
    text-decoration: none;
    font-size: 1.5em;
  }
`;
