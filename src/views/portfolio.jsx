import React from "react";
import { connect } from 'react-redux';
import Calculator from "../components/Calculator/Calculator";
import data from '../assets/data.json';

const mapStateProps = (state) => {
    let risk =data.filter(risk => (risk.id == state.riskManagement.value))[0];
    return {
        selected: state.riskManagement.value,
        risk: risk,
    }
}

function Portfolio({ risk, selected }) {
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

export default connect(mapStateProps, null)(Portfolio);