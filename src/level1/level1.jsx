import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global, css } from '@emotion/react'
import Logo from '../LogoSetup';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Copie from '../assets/copie.png';

import {
  Container,
  NumberSet, NumberItem, NumberWord
} from '../EmotionForMoblie';

function Level1() {
  const { userId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);
  const numberRef = useRef(null);
  const [userEc1, setUserEc1] = useState([]);
  const [userEc2, setUserEc2] = useState([]);

  const IpAddress = '54.226.61.199:8080'

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await fetch(`http://localhost:8080/users/${userId}`);
        const response = await fetch(`http://${IpAddress}/users/${userId}`);
        const userData = await response.json();
        setUserEc1([userData.emergency_contacts[0].phone, userData.emergency_contacts[0].name]);
        setUserEc2([userData.emergency_contacts[1].phone, userData.emergency_contacts[1].name]);
      } catch (err) {
        setError(err.message);
        throw Error('そのユーザーは存在しません');
      }
    };
    fetchUser();
  }, [userId]);

  const emergencyContacts = [
    { href: 'tel:' + (userEc1[0] || ''), text: userEc1[1] },
    { href: 'tel:' + (userEc2[0] || ''), text: userEc2[1] },
  ];


  const handleReport = () => {
    window.location.href = 'tel:119';
  };

  const handleEmergencyContact = () => {
    setModalOpen(true);
  };

  const handleCopy = () => {
    const numberText = numberRef.current.innerText;
    navigator.clipboard.writeText(numberText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </ErrorContainer>
    );
  }

  if (!userEc1) {
    return <LoadingMessage>読み込み中...</LoadingMessage>;
  }

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
            {userId}
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

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #B22222;
  color: white;
`;

const ErrorMessage = styled.p`
  font-size: 1.2em;
  margin: 10px 0;
`;

const LoadingMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2em;
  background-color: #B22222;
  color: white;
`;