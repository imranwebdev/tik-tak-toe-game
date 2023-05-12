import React from "react";
import UserReg from "./components/welcomPage"
import Game from "./components/game";
import "./assets/css/global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  function App() {
    return (
      <>
       
      <Router>
        <Routes>
          <Route path="/"element={ <UserReg />}></Route>
          <Route path="/game"element={ <Game />}></Route>
        </Routes>
      </Router>

      </>
    )
  }
export default App;