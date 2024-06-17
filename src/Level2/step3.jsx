import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Global, css } from '@emotion/react'
import { Swiper, SwiperSlide } from "swiper/react";
import Logofunc from "../LogoSetup";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";

function Step3() {
    const navigate = useNavigate();

    const id = "1A2B";
    return (
        <>
            <Global
                styles={css`
                    body{
                        background-color: ${bgColor};
                    }
                `} />
            <Container>
                <Header>
                    <LogoutButton onClick={() => navigate("/step2")}>退出</LogoutButton>
                    <Logofunc />

                    <NumberSet>
                        <NumberItem>患者番号:</NumberItem>
                        <Number>{id}</Number>
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
                                    岸本 大空
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
                                    ECCコンピュータ
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
                                    母親
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
                            <Value>●123123123</Value>
                            <CenteredField>
                                <Label>
                                    <Furigana>いりょうめも</Furigana>
                                    医療メモ
                                </Label>
                            </CenteredField>
                            <Value>●看護師にナンパしない。今度は警察</Value>
                            <Value>●看護師にナンパしない。今度は警察</Value>
                        </SwiperSlide>
                    </Swiper>
                </SwiperContainer>
            </Container>
        </>
    );
}

export default Step3;


const bgColor = 'green'
const LogoutButton = styled.button`
  background-color: green;
  border: 1px solid white;
  border-radius:5px;
  color: white;
  position: absolute;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
    top: 20px;
    right: 20px;
    font-size: 14px;
    padding: 8px 16px;
`;
const Container = styled.div`
  background-color: green;
  padding: 3vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Title = styled.div`
  color:#000;
  font-size: 2.5vh;
  font-weight: bold;
  margin-bottom:1%;
  text-align: center;

`;

const SwiperContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 400px; 
  height: 100%;
  flex: 1;
  padding: 3vh;
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
  font-size: 2vh;
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
