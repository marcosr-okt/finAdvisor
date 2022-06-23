import React from "react";
import Calculator from "../components/Calculator/Calculator";

export default function Portfolio({ risk, selected }) {
    return (
        <div className="portfolio">
            <h2 className="portfolio__title">Personalized Portfolio</h2>
            <h3 className="portfolio__subtitle">Risk Level {selected !== 0 ? selected : '0'}</h3>
            <div className="portfolio__info-table">
                <div className="portfolio__info-row">
                    {risk.categories.map((level, index) => (<div key={index}>{level.type}</div>))}
                </div>
                <div className="portfolio__info-row">
                    {risk.categories.map((level, index) => (<div key={index}>{level.value} %</div>))}
                </div>
            </div>
            <Calculator risk={risk} />
        </div>
    );
}