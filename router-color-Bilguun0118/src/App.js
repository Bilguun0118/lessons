import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Step2 } from "./components/step2";
import { Step1 } from "./components/step1";
import { Main } from "./components/Main";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path=":color1" element={<Main />}>
            <Route path=":color2" element={<Step1 />}>
              <Route path=":color3" element={<Step2 />} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
