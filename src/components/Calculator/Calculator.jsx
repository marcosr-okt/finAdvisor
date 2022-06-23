import React from "react";
import { connect } from 'react-redux';
import { balanceData, calculateItemsToBalance } from '../../utilities/utilities';

const mapStateProps = (state) => {
    return {
        selected: state.riskManagement.value
    }
}

function Calculator({ risk, selected }) {
    const [recomendations, setRecommendations] = React.useState([]);

    const verifyNumbers = () => {
        let table = Array.from(document.querySelectorAll('.calculator__table-row'));
        return table.every(row => (parseFloat(row.querySelector('.user_input').value) >= 0));
    };

    const getRecomendations = (exceedArray, lackArray) => {
        const recomendationsList = balanceData(exceedArray, lackArray);
        setRecommendations([...recomendationsList]);
    };

    const handleRebalance = () => {
        let isModified = verifyNumbers();
        if (!isModified) {
            return;
        }
        let table = document.querySelectorAll('.calculator__table-row');
        let {valuesToTransfer, valuesToAdd} = calculateItemsToBalance(table);
        getRecomendations([...valuesToTransfer], [...valuesToAdd]);
    };

    return (
        <>
            <div className="calculator__rebalance-container">
                <p>Please Enter Your Current Portfolio</p>
                <button onClick={handleRebalance} className='calculator__rebalance-button'>Rebalance</button>
            </div>
            <div className="calculator__table">
                <div className="calculator__table_values">
                    <div className="calculator__header"></div>
                    <div className="calculator__header">Current Amount</div>
                    <div className="calculator__header">Difference</div>
                    <div className="calculator__header">New Amount</div>
                    {risk.categories.map((level, index) => {
                        return (
                            <div key={index} className='calculator__table-row' data-weight={level.value}>
                                <label data-label={level.type}>{level.type} $</label>
                                <input type="number" min='0' className="user_input" />
                                <input disabled type="number" className="user_difference"></input>
                                <input disabled type="number" className="user_new"></input>
                            </div>
                        )
                    })}
                </div>
                <div className="calculator__table_recommendation">
                    <div className="calculator__header">Recommended Transfers</div>
                    <ul>
                        {recomendations.map((recomendation, index) => (
                            <li key={index}>{recomendation}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default connect(mapStateProps, null)(Calculator)