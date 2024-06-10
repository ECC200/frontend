// import './App.css'
// import WebVersion from './Web/WebVersion'
// // import Phone from './Level2/phone'
// // import LV1 from './Level1/level1'

// function App() {
//   return (
//     <>
//       <WebVersion />
//       {/* <Phone /> */}
//       {/* <LV1 /> */}
//     </>
//   )
// }

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Step1Login from "./Level2/step1Login";
import Step2Login from "./Level2/step2Login";
import Step3Detail from "./Level2/step3Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Step1Login />} />
        <Route path="/step2" element={<Step2Login />} />
        <Route path="/step3" element={<Step3Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
