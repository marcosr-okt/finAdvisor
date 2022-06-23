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
  const [selectedId, setSelected] = React.useState(0);

  const handleSelectionChange = (value) => {
    setSelected(value);
    selectedRisk = data.filter(risk => (risk.id === value))[0];
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home data={data} selected={selectedId} changeHandler={handleSelectionChange} />} />
          <Route path="calculator" element={<Portfolio risk={selectedRisk} selected={selectedId}/>} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;