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

function Step3() {
    const { disabilityId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`Fetching data for disabilityId: ${disabilityId}`);
                const response = await fetch(`http://localhost:8080/users/${disabilityId}`);
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
                    <Number>{userData.user_id}</Number>
                </NumberSet>

                <SwiperContainer>
                    <Swiper
                        pagination={{ dynamicBullets: true }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {/* Page one */}
                        <SwiperSlide>
                            <Title>基本情報</Title>
                            {/* 名前 */}
                            <Field>
                                <Label>
                                    <Furigana>なまえ</Furigana>
                                    名前
                                </Label>
                                <Value>{userData.user_name}</Value>
                            </Field>
                            {/* 生年月日 */}
                            <Field>
                                <Label>
                                    <Furigana>せいねんがっぴ</Furigana>
                                    生年月日
                                </Label>
                                <Value>{userData.birth_date}</Value>
                            </Field>
                            {/* 持病 */}
                            <Field>
                                <Label>
                                    <Furigana>じびょう</Furigana>
                                    持病
                                </Label>
                                <Value>{userData.chronic_disease}</Value>
                            </Field>
                            {/* 緊急連絡人 */}
                            {userData.emergency_contacts.map((contact, index) => (
                                <Field key={index}>
                                    <Label>
                                        <Furigana>きんきゅうれんらくにん</Furigana>
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
                                    <Furigana>びょういん</Furigana>
                                    病院
                                </Label>
                                <Value>{userData.hospital_destination}</Value>
                            </Field>
                            {/* 医者 */}
                            <Field>
                                <Label>
                                    <Furigana>いしゃ</Furigana>
                                    医者
                                </Label>
                                <Value>{userData.primary_care_doctor}</Value>
                            </Field>
                            {/* 何科 */}
                            <Field>
                                <Label>
                                    <Furigana>なにか</Furigana>
                                    何科
                                </Label>
                                <Value>{userData.department}</Value>
                            </Field>
                        </SwiperSlide>

                        {/* Page three */}
                        <SwiperSlide>
                            <Title>倒れた履歴</Title>
                            <CenteredField>
                                <Label>
                                    <Furigana>しょほうじょうきょう</Furigana>
                                    処方状況
                                </Label>
                            </CenteredField>
                            <Value>{userData.medication_management}</Value>
                            <CenteredField>
                                <Label>
                                    <Furigana>いりょうめも</Furigana>
                                    医療メモ
                                </Label>
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

const UpperRightBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5em;
`;

// const Header = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const NumberSet = styled.div`
  text-align: center;
  margin: 1vh 0;
  padding: 0;
`;

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

const Furigana = styled.div`
  font-size: 1vh;
  color: gray;
`;
