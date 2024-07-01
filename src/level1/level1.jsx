import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Logo from '../LogoSetup';
import { Global, css } from '@emotion/react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Copie from '../assets/copie.png';


import {
  // Container
  Container,
  // Number
  NumberSet, NumberItem, NumberWord
} from '../EmotionForMoblie';

function Level1() {
  const id = "1A2B3A6G8E";
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
            }
        `} />
      <Container>
        {/* Main */}
        <Logo color='#fff' />
        <NumberSet>
          <NumberItem>患者番号:</NumberItem>
          <NumberWord ref={numberRef}>
            {id}
            <CopieBT src={Copie} onClick={handleCopy} alt="Copy Icon" />
          </NumberWord>
          {isCopied && <CopiedMessage>Copied!</CopiedMessage>}
        </NumberSet>


        <Button onClick={handleReport}>119</Button>
        <Button onClick={handleEmergencyContact}>緊急連絡先</Button>

        <Dialog open={isModalOpen}>
          <DialogBoxArea>
            <DialogTitle>どこに連絡しますか？</DialogTitle>
            <DialogContent className='DialogContentStyle'>
              <LinkList>
                {emergencyContacts.map((contact, index) => (
                  <LinkItem key={index}>
                    <a href={contact.href}>{contact.text}</a>
                  </LinkItem>
                ))}
              </LinkList>
              <ModalButton onClick={() => setModalOpen(false)}>閉じる</ModalButton>
            </DialogContent>
          </DialogBoxArea>
        </Dialog >
      </Container>
    </>
  );
}

export default Level1;

const Button = styled.button`
  font-size: 2em;
  padding: 15px 30px;
  margin: 15px 0;
  width: 250px;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: black;
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
    font-size:1.5em;
    letter-spacing: 1px;
  }
`;


const DialogBoxArea = styled.div`
  width:300px;
  text-align:center;
`


const CopiedMessage = styled.p`
  color: white;
  font-size: 1em;
  margin-top: 1px;
  margin-bottom: 1px;
`;

const CopieBT = styled.img`
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 20px;
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
`;