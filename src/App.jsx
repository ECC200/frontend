import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Step1Login from "./Level2/step1Login";
import Step2Login from "./Level2/step2Login";
import Step3Detail from "./Level2/step3Detail";
import SignUpTop from "./SignUp/signUpTop";
import DisSignUpTop from "./DisSignUp/disSignUpTop";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Step1Login />} />
        <Route path="/step2" element={<Step2Login />} />
        <Route path="/step3" element={<Step3Detail />} />
        <Route path="/signUp" element={<SignUpTop />} />
        <Route path="/disSignUp" element={<DisSignUpTop />} />
      </Routes>
    </Router>
  );
}

export default App;
