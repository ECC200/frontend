import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import styled from "@emotion/styled";
import Logofunc from "../LogoSetup";

const Container = styled.div`
  background-color: green;
  padding: 5vh;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;


const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2vh;
`;

const Number = styled.div`
  font-size: 10vh;
  margin-top: 1vh;
`;

const Title = styled.div`
  font-size: 4vh;
  margin-top: 0.5vh;
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

function Step3Detail() {
  return (
    <Container>
      <Header>
        <Logofunc />
        <Number>1a2a</Number>
        <Title>基本情報</Title>
      </Header>
      <SwiperContainer>
        <Swiper
          pagination={{ dynamicBullets: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Field>
              <Label>
                <Furigana>なまえ</Furigana>
                名前
              </Label>
              <Label>
                <Furigana>　きしもと 　たく</Furigana>
                岸本 大空
              </Label>
            </Field>
            <Field>
              <Label>
                <Furigana>せいねんがっぴ</Furigana>
                生年月日
              </Label>
              <Value>2024/05/16</Value>
            </Field>
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
            <Field>
              <Label>
                <Furigana>　きんきゅうれんらくにんとのかんけい</Furigana>
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
            <Value></Value>
            <Value></Value>
            <Value></Value>
            <Value></Value>
            <Value></Value>
            <Value></Value>
            <Value></Value>
            <Value></Value>
            <Value></Value>
            <Value></Value>
            <Value></Value>
          </SwiperSlide>
          <SwiperSlide>
            <Field>
              <Label>
                <Furigana>びょういん</Furigana>
                病院
              </Label>
              <Label>
                <Furigana>　いーしーしーこんぴゅーた</Furigana>
                ECCコンピュータ
              </Label>
            </Field>
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
          <SwiperSlide>
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
  );
}

export default Step3Detail;
