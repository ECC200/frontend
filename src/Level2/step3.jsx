import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Global, css } from '@emotion/react'
import { Swiper, SwiperSlide } from "swiper/react";
import Logo from "../LogoSetup";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";

import {
    // Container
    Container,
    // Header
    Header,
    // Number
    NumberSet, NumberItem, NumberWord,
    // Button
    UpperRightBtn,

} from '../EmotionForMoblie';

function Step3() {
    const navigate = useNavigate();

    const id = "1A2B";

    const patientData = {
        PersonImg: '',
        Fullname: '岸本 たく',
        Birthday: '2003-08-30',
        DisabilityType: '障害種別',
        DisabilityLevel: '障がい者等級',
        Hospital: 'XX病院',
        Doctor: 'XX医',
        PersonContact: '080-3860-1577',
        EmergencyContact: '0120-333-906',
        Address: '大阪府吹田市春日4-7-1-310',
        Medicine: 'デパケン',
        DoctorMessage: 'がんばってねー'
    };

    return (
        <>
            <Global
                styles={css`
                    body{
                        background-color: green;
                    }
                `} />
            <Container>
                <Header>
                    <UpperRightBtn onClick={() => navigate("/step2")}>退出</UpperRightBtn>
                    <Logo color='#fff' />
                    <NumberSet>
                        <NumberItem>患者番号:</NumberItem>
                        <NumberWord>{id}</NumberWord>
                    </NumberSet>
                </Header>


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
                                <Label>
                                    <Furigana> きしもと  たく</Furigana>
                                    {patientData.Fullname}
                                </Label>
                            </Field>
                            {/* 生年月日 */}
                            <Field>
                                <Label>
                                    <Furigana>せいねんがっぴ</Furigana>
                                    生年月日
                                </Label>
                                <Value>2024/05/16</Value>
                            </Field>
                            {/* 持病 */}
                            <Field>
                                <Label>
                                    <Furigana>じびょう</Furigana>
                                    持病
                                </Label>
                                <Label>
                                    <Furigana>びんぼう</Furigana>
                                    貧乏
                                </Label>
                            </Field>
                            {/* 緊急連絡人との関係 */}
                            <Field>
                                <Label>
                                    <Furigana> きんきゅうれんらくにんとのかんけい</Furigana>
                                    緊急連絡人との関係
                                </Label>
                                <Label>
                                    <Furigana>ははおや</Furigana>
                                    母親
                                </Label>
                            </Field>
                            <Value></Value>
                            <Value></Value>
                            <Value></Value>
                            <Value></Value>
                            <Value></Value>
                            <Value></Value>
                            <Value></Value>
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
                                <Label>
                                    <Furigana> いーしーしーこんぴゅーた</Furigana>
                                    {patientData.Hospital}
                                </Label>
                            </Field>
                            {/* 医者 */}
                            <Field>
                                <Label>
                                    <Furigana>いしゃ</Furigana>
                                    医者
                                </Label>
                                <Label>
                                    <Furigana>ははおや</Furigana>
                                    {patientData.Doctor}
                                </Label>
                            </Field>
                            {/* 何科 */}
                            <Field>
                                <Label>
                                    <Furigana>なにか</Furigana>
                                    何科
                                </Label>
                                <Label>
                                    <Furigana>びんぼう</Furigana>
                                    貧乏
                                </Label>
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
                            <Value>{patientData.Medicine}</Value>
                            <CenteredField>
                                <Label>
                                    <Furigana>いりょうめも</Furigana>
                                    医療メモ
                                </Label>
                            </CenteredField>
                            <Value>{patientData.DoctorMessage}</Value>
                        </SwiperSlide>
                    </Swiper>
                </SwiperContainer>
            </Container>
        </>
    );
}

export default Step3;


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
  font-size: 1.5vh;
  color: gray;
`;
