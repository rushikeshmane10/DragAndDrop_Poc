import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { CmxLoop } from "./pages/Loop/KanBanLoop";

function App() {

let openai_api_key = "sk-1234567890abcdefghijklmnopqrstuv55"
  return (
    <>
      <BrowserRouter>
        <Routes>  
          <Route path="/" element={<CmxLoop />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
