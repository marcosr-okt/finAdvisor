import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Error from "./views/error";
import Layout from "./views/layout";
import data from './assets/data.json'
import "./App.css"
import Portfolio from "./views/portfolio";

let selectedRisk = {};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="calculator" element={<Portfolio risk={selectedRisk}/>} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;