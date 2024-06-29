import { useState } from 'react';
import styled from '@emotion/styled';
import Logo from '../LogoSetup';
import { Global, css } from '@emotion/react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import {
  // Container
  Container,
  // Number
  NumberSet, NumberItem, NumberWord
} from '../EmotionForMoblie';

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
      <Container>
        {/* Main */}
        <Logo color='#fff' />
        <NumberSet>
          <NumberItem>患者番号:</NumberItem>
          <NumberWord>{id}</NumberWord>
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
  a{
    text-decoration: none;
    font-size:1.5em;
    letter-spacing: 1px;
  }
`;


const DialogBoxArea = styled.div`
  width:300px;
  text-align:center;
`