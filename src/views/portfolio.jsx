import React from "react";
import { connect } from 'react-redux';
import Calculator from "../components/Calculator/Calculator";
import data from '../assets/data.json';

const zeroState = {
    id: 0,
    risk: 0,
    categories: [
        {
            type: "Bonds",
            value: 0
        },
        {
            type: "Large Cap",
            value: 0
        },
        {
            type: "Mid Cap",
            value: 0
        },
        {
            type: "Foreign",
            value: 0
        }
        , {
            type: "Small Cap",
            value: 0
        }
    ]
};


const mapStateProps = (state) => {
    let risk;
    if(state.preference.value == 0){
        risk = {...zeroState};
    }else{
        risk = data.filter(risk => risk.risk === state.preference.value)[0];
    }
    console.log('risk');
    console.log(risk)
    return {
        selected: state.preference.value,
        risk: risk
    }
}

function Portfolio({ risk, selected }) {
    return (
        <div className="portfolio">
            <h2 className="portfolio__title">Personalized Portfolio</h2>
            <h3 className="portfolio__subtitle">Risk Level {selected !== 0 ? selected : '0'}</h3>
            <div className="portfolio__info-table">
                <div className="portfolio__info-row">
                    {selected !== 0 && risk.categories.map((level, index) => (<div key={index}>{level.type}</div>))}
                </div>
                <div className="portfolio__info-row">
                    {selected !== 0 && risk.categories.map((level, index) => (<div key={index}>{level.value} %</div>))}
                </div>
            </div>
            <Calculator risk={risk} />
        </div>
    );
}

export default connect(mapStateProps, null)(Portfolio);