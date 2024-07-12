import styled from "@emotion/styled";

// ------------ Web Version --------------------
// Err
export const ErrColor = '#ff1515'

// Button
export const BtnRadius = '10px'
export const BtnBorder = '1px'
export const BtnPadding = '10px 20px'
export const BtnFontSize = '16px'
export const BtnLetterSpacing = '5px'
export const BtnTextTransform = 'uppercase'
export const BtnCursor = 'pointer'

// Submit Button
export const SubmitBtnColor = 'transparent'

// Input
export const InputBorder = '1px'
export const InputHeight = '40px'
export const InputRadius = '10px'
export const InputLableWord = '18px'

// Input Set Area
export const InputAreaWidth = '85%'

// Submit button
export const SubmitBtnPattern = `
  border-radius: ${BtnRadius};
  background-color: ${SubmitBtnColor};
  font-size: ${BtnFontSize};
  letter-spacing: ${BtnLetterSpacing};
  padding: ${BtnPadding};
  text-transform: ${BtnTextTransform};
  cursor: ${BtnCursor};
`







// ---------------------------- Emotion ------------------------------------
// input
export const InputLabelBlack = styled.label`
  color: #000;
  font-size: ${InputLableWord};
  letter-spacing: ${BtnLetterSpacing};
  `;

export const InputLabelWhite = styled.label`
  color: #fff;
  font-size: ${InputLableWord};
  letter-spacing: ${BtnLetterSpacing};
`;
export const ErrInputLabel = styled.label`
    color: ${ErrColor};
  font-size: ${InputLableWord};
  letter-spacing: ${BtnLetterSpacing};
`;

export const InputBar = styled.input`
  border: ${InputBorder} solid #000;
  border-radius: ${InputRadius};
  color: #000;
  height: ${InputHeight};
  width: 100%;
  margin-top: 5px;
  padding-left: 10px;
  :hover {
    background-color: hsl(0 0% 85%);
  }
`;

export const ErrInputBar = styled.input`
  border: ${InputBorder} solid ${ErrColor};
  border-radius: ${InputRadius};
  color: ${ErrColor};
  height: ${InputHeight};
  width: 100%;
  margin-top: 5px;
  padding-left: 10px;
  :hover {
    background-color: hsl(0 0% 85%);
  }
`;

export const InputArea = styled.div`
width: ${InputAreaWidth};
margin: 3% auto;
`

// Header and Title

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  background-color:gray;
`;

export const PageTitle = styled.h1`
      text-align: center;
      margin:35px 0;
      font-size:40px;
`


// Other
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

export const UpperRightBtn = styled.button`
border: ${BtnBorder} solid white;
border-radius: ${BtnRadius};
color: white;
position: absolute;
cursor: pointer;
top: 10px;
right: 10px;
font-size: ${BtnFontSize};
padding: 8px 16px;
`;

export const ErrMsg = styled.p`
    color: ${ErrColor};
    font-size: ${BtnFontSize};
    letter-spacing: 3px;
    text-align: center;
    margin: 10px 0;
`;

export const DialogBoxArea = styled.div`
    width:600px;
    text-align:center;
`;