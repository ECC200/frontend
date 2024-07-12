import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";
import { Global, css } from '@emotion/react';
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import {
    NumberWord, NumberSet, NumberItem, UpperRightBtn
} from '../EmotionForMoblie'



function Step3() {
    const { disabilityId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const IpAddress = '54.226.61.199:8080'

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://localhost:8080/users/${disabilityId}`);
                const response = await fetch(`http://${IpAddress}/users/${disabilityId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    navigate("/step2");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
                navigate("/step2");
            }
        };
        fetchData();
    }, [disabilityId, navigate]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Global
                styles={css`
                    body {
                        background-color: green;
                    }
                `}
            />
            <UpperRightBtn onClick={() => navigate("/step2")}>退出</UpperRightBtn>
            <Container>
                <Logofunc color="#fff" />

                <NumberSet>
                    <NumberItem>患者番号:</NumberItem>
                    <NumberWord>{userData.user_id}</NumberWord>
                </NumberSet>

                <SwiperContainer>
                    <Swiper
                        pagination={{ dynamicBullets: true }}
                        modules={[Pagination]}
                        className="mySwiper"
                        style={{ height: '350px' }}
                    >
                        {/* Page one */}
                        <SwiperSlide>
                            <Title>基本情報</Title>
                            {/* 名前 */}
                            <Field>
                                <Label>
                                    名前
                                </Label>
                                <Value>{userData.user_name}</Value>
                            </Field>
                            {/* 生年月日 */}
                            <Field>
                                <Label>
                                    生年月日
                                </Label>
                                <Value>{userData.birth_date}</Value>
                            </Field>
                            {/* 持病 */}
                            <Field>
                                <Label>
                                    持病
                                </Label>
                                <Value>{userData.chronic_disease}</Value>
                            </Field>
                            {/* 緊急連絡人 */}
                            {userData.emergency_contacts.map((contact, index) => (
                                <Field key={index}>
                                    <Label>
                                        緊急連絡人
                                    </Label>
                                    <Value>{contact.name} - {contact.phone}</Value>
                                </Field>
                            ))}
                        </SwiperSlide>

                        {/* Page two */}
                        <SwiperSlide>
                            <Title>かかりつけ病院</Title>
                            {/* 病院 */}
                            <Field>
                                <Label>
                                    病院
                                </Label>
                                <Value>{userData.hospital_destination}</Value>
                            </Field>
                            {/* 医者 */}
                            <Field>
                                <Label>
                                    医者
                                </Label>
                                <Value>{userData.primary_care_doctor}</Value>
                            </Field>
                            {/* 何科 */}
                            <Field>
                                <Label>
                                    何科
                                </Label>
                                <Value>{userData.specialty}</Value>
                            </Field>
                        </SwiperSlide>

                        {/* Page three */}
                        <SwiperSlide>
                            <CenteredField>
                                <Title>医療メモ</Title>
                            </CenteredField>
                            <Value>{userData.doctor_comment}</Value>
                        </SwiperSlide>

                        {/* Page four */}
                        <SwiperSlide>
                            <CenteredField>
                                <Title>倒れた履歴</Title>
                            </CenteredField>
                            {userData.historys && userData.historys.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Label>
                                        <Value>{item.date} - {item.memo}</Value>
                                    </Label>
                                    <br />
                                </React.Fragment>
                            ))}
                        </SwiperSlide>

                    </Swiper>
                </SwiperContainer>
            </Container>
        </>
    );
}

export default Step3;

const bgColor = 'green';

const Container = styled.div`
  background-color: ${bgColor};
  padding: 3vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



const Title = styled.div`
  color:#000;
  font-size: 2.5vh;
  font-weight: bold;
  margin-bottom:1%;
  text-align: center;
`;

const SwiperContainer = styled.div`
  background-color: white;
  width: 85%;
  height: 150%;
  flex: 1;
  padding: 2vh;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
`;

const Field = styled.div`
  margin-bottom: 1vh;
  padding: 1vh 2vh; 
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CenteredField = styled(Field)`
  justify-content: center;
  text-align: center;
`;

const Label = styled.div`
  font-size: 2.5vh;
  color: black;
`;

const Value = styled.div`
  font-size: 1.8vh;
  color: black;
  display: flex;
  justify-content: center;
  padding: 0.5vh 0;
`;
