// ------------ All Mobile Version --------------------
import styled from "@emotion/styled";

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

// Input Set Area
export const InputAreaWidth = '85%'

export const SubmitBtnPattern = `
  border-radius: ${BtnRadius};
  background-color: ${SubmitBtnColor};
  font-size: ${BtnFontSize};
  letter-spacing: ${BtnLetterSpacing};
  padding: ${BtnPadding};
  text-transform: ${BtnTextTransform};
  cursor: ${BtnCursor};
`
export const InputLabelBlack = styled.label`
color: #000;
font-size: 100%;
`;

export const InputLabelWhite = styled.label`
color: #fff;
font-size: 100%;
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

export const InputArea = styled.div`
width: ${InputAreaWidth};
margin: 5% 0;
`

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-top: 30px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UpperRightBtn = styled.button`
background-color: green;
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

export const NumberSet = styled.div`
  color: #fff;
  text-align: center;
  margin: 15px 0;
  padding: 0;
`
export const NumberItem = styled.p`
  padding: 0;
  font-size: 1em;
`;
export const NumberWord = styled.p`
  padding: 0;
  font-size: 4em;
`;


// ----------------------------------------------------------------

