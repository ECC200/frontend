// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Global, css } from '@emotion/react';
import Step1 from "./Level2/step1";
import Step2 from "./Level2/step2";
import Step3 from "./Level2/step3";
// import WebStaffData from './Web/webStaffData'
import WebStaffReLogin from './Web/webStaffReLogin';
import WebLogin from './Web/webLogin';
import Level1 from './level1/level1';
import SignUpTop from "./Web/webSignUp";
import DisSignUpTop from "./Web/webDisSignUp";
// import { EncryptRoute } from './EncryptRoute';

function App() {
  return (
    <>
      <Global
        styles={css`
          * {
            margin: 0;
            box-sizing: border-box;
          }
        `}
      />
      <Router>
        <Routes>
          <Route path="/step1" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/level1" element={<Level1 />} />
          <Route path="/WebLogin" element={<WebLogin />} />

          {/* <Route path="/WebStaffData" element={
            <EncryptRoute path="/WebStaffData" encryptedPath="/asdjlahb2kj13kj1231231">
              <WebStaffData />
            </EncryptRoute>
          } /> */}
          {/* <Route path="/asdjlahb2kj13kj1231231" element={<WebStaffData />} /> */}

          <Route path="/WebSignUp" element={<SignUpTop />} />
          <Route path="/WebDisSignUp" element={<DisSignUpTop />} />
          <Route path="/webStaffReLogin" element={<WebStaffReLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
