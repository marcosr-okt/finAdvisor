import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Error from "./views/error";
import Layout from "./views/layout";
import Portfolio from "./views/portfolio";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="calculator" element={<Portfolio />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
