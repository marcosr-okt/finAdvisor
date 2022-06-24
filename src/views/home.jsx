import React from "react";
import RiskSelector from "../components/RiskSelector/RiskSelector";
import "./views.css";

export default function Home() {
  return (
    <div className="home__container">
      <h2 className="home__title">
        Please Select A Risk Level For Your Investment Portfolio
      </h2>
      <RiskSelector/>
    </div>
  );
}