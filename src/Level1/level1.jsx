import styled from '@emotion/styled';

const AppContainer = styled.div`
  text-align: center;
  background-color: #B22222;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  background-color: #B22222;
  color: white;
  font-family: 'Arial', sans-serif;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-sizing: border-box;
`;

const CareConnect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  img {
    width: 100px;
    height: 100px;
  }
`;

const Id = styled.div`
  font-size: 2em;
  margin: 20px 0;
`;

const Button = styled.button`
  font-size: 1.2em;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  color: black;
`;

function Level1() {
    const id = "1A2B"; // ここに実際の障がい者番号を設定

    return (
        <AppContainer>
            <Header>
                <CareConnect>
                    <Icon>
                        <img src="/logo.png" alt="Care Connect Logo" />
                    </Icon>
                    <Id>{id}</Id>
                    <Button>通報</Button>
                    <Button>緊急連絡人</Button>
                </CareConnect>
            </Header>
        </AppContainer>
    );
}

export default Level1;
