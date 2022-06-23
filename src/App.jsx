import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/home";
import Error from "./views/error";
import Layout from "./views/layout";
import Calculator from "./views/calculator";

import data from './assets/data.json'

import "./App.css"
function App() {
  
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home data={data}/>} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </div>
  );
};

export default App;