import styled from '@emotion/styled';
import logoPic from '../assets/logo.png';

// 背景が緑のコンポーネント
const GreenBackground = styled.div`
  background-color: #008000;  // 緑の背景色
  min-height: 100vh;  // 最低でも画面の高さいっぱいに広がるように
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  color: #ffffff;  // 全体の文字色を白に設定
`;

// 画像を表示するコンポーネント
const LogoImage = styled.img`
  width: 20%;  // 画面の20%の幅に設定
  max-width: 200px;  // 最大幅を200pxに設定
  margin-top: 20px;
`;

// 入力ボックスとボタンを含むフォームのコンポーネント
const FormContainer = styled.div`
  background-color: transparent;  // 背景色を透明に設定
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ラベルのスタイル
const FormLabel = styled.label`
  margin-bottom: 10px;
`;

// 入力ボックスのスタイル
const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

// ボタンのスタイル
const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #008000;  // 白色の背景
  border: 2px solid #ffffff;  // ボタンに白の外線を追加
  border-radius: 4px;
  cursor: pointer;
  color: #ffffff;  // 全体の文字色を白に設定
`;

// ログアウトボタンのスタイル
const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #008000;  // 白色の背景
  border: 2px solid #ffffff;  // ボタンに白の外線を追加
  border-radius: 4px;
  cursor: pointer;
  color: #ffffff;  // 全体の文字色を白に設定
`;

const MainScreen = () => {
  return (
    <GreenBackground>
      <LogoutButton onClick={() => window.history.back()}>ログアウト</LogoutButton>
      <LogoImage src={logoPic} alt="ロゴ画像" />
      <FormContainer>
        <FormLabel htmlFor="disabilityNumber">障がい者番号：</FormLabel>
        <FormInput type="text" id="disabilityNumber" placeholder="障がい者番号を入力してください" />
        <FormButton>入力</FormButton>
      </FormContainer>
    </GreenBackground>
  );
};

export default MainScreen;
