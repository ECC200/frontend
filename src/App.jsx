import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Step1Login from "./Level2/step1Login";
import Step2Login from "./Level2/step2Login";
import Step3Detail from "./Level2/step3Detail";
import WebStaffData from './Web/webStaffData'
import WebLogin from './Web/webLogin'
import Level1 from './Level1/level1'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/step1" element={<Step1Login />} />
        <Route path="/step2" element={<Step2Login />} />
        <Route path="/step3" element={<Step3Detail />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/WebLogin" element={<WebLogin />} />
        <Route path="/WebStaffData" element={<WebStaffData />} />
      </Routes>
    </Router>
  );
}

export default App;
