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
