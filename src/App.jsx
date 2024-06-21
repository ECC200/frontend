import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Step1 from "./Level2/step1";
import Step2 from "./Level2/step2";
import Step3 from "./Level2/step3";
import WebStaffData from './Web/webStaffData'
import WebLogin from './Web/webLogin'
import Level1 from './level1/level1'
import UpdatePatient from './Web/UpdatePatient'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/WebLogin" element={<WebLogin />} />
        <Route path="/WebStaffData" element={<WebStaffData />} />
        <Route path="/UpdatePatient" element={<UpdatePatient />} />
      </Routes>
    </Router>
  );
}

export default App;
