import React from "react";

const headers = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];

const ascOrdering = (a, b) => {
    return b.value - a.value;
};

export default function Home() {
    const [recomendations, setRecommendations] = React.useState([]);
    const level = {
        id: 1,
        risk: 1,
        bond: 40,
        large: 20,
        mid: 20,
        foreign: 20,
        small: 0
    }
    const values = [40, 20, 20, 20, 0];
    const verifyNumbers = () => {
        let table = Array.from(document.querySelectorAll('.rowType'));
        return table.every(row => (row.querySelector('.user_input').value >= 0));
    }
    const getRecomendations = (exceedArray, lackArray) => {
        const recomendationsList = [];
        while(exceedArray.length > 0){
            exceedArray.sort(ascOrdering);
            lackArray.sort(ascOrdering);
            if (lackArray[0].value >= exceedArray[0].value) {
                let itemToRemove = exceedArray.shift();
                let itemToChange = lackArray[0];
                if (itemToChange.value - itemToRemove.value == 0) {
                    lackArray.shift();
                } else {
                    lackArray[0].value = parseFloat((itemToChange.value - itemToRemove.value).toFixed(2));
                }
                recomendationsList.push(`Transfer $${itemToRemove.value} from ${itemToRemove.name} to ${itemToChange.name}`)
            } else {
                let itemToRemove = lackArray.shift();
                let itemToChange = exceedArray[0];
                if (itemToChange.value - itemToRemove.value == 0) {
                    exceedArray.shift();
                } else {
                    exceedArray[0].value = parseFloat((itemToChange.value - itemToRemove.value).toFixed(2));
                }
                recomendationsList.push(`Transfer $${itemToRemove.value} from ${itemToRemove.name} to ${itemToChange.name}`)
            }
        }
        setRecommendations(recomendationsList);
    }
    const handleRebalance = (event) => {
        let isModified = verifyNumbers();
        if (!isModified) {
            return;
        }
        let sum = 0;
        let table = document.querySelectorAll('.rowType');
        for (let i = 0; i < table.length; i++) {
            let row = table[i];
            let rowValue = parseFloat(row.querySelector('.user_input').value);
            sum += rowValue;
        }
        let valuesToTransfer = [];
        let valuesToAdd = [];

        for (let i = 0; i < table.length; i++) {
            let row = table[i];
            let userValue = parseFloat(row.querySelector('.user_input').value);
            let newValue = sum * values[i] / 100;
            let difference = parseFloat((newValue - userValue).toFixed(2));

            row.querySelector('.user_new').value = newValue;
            row.querySelector('.user_difference').value = difference;

            let typeLabel = row.querySelector('label').dataset.label;
            console.log(-difference);
            if (difference >= 0) {
                row.querySelector('.user_difference').style.color = 'green';
                if (difference > 0) {
                    console.log(difference)
                    valuesToAdd.push({
                        name: typeLabel,
                        value: difference
                    });
                }
            } else {
                row.querySelector('.user_difference').style.color = 'red';
                console.log(-difference)

                valuesToTransfer.push({
                    name: typeLabel,
                    value: -difference
                });
            }
        }
        getRecomendations([...valuesToTransfer], [...valuesToAdd]);
    };
    return (
        <div>
            <h2 className="calculator__title">Personalized Portfolio</h2>
            <h3 className="calculator__subtitle">Risk Level {level ? level.risk : '0'}</h3>
            <div className='row'>
                {headers.map((value, index) => (<div key={index}>{value}</div>))}
            </div>
            <div className='row'>
                <div> {level.bond}</div>
                <div> {level.large}</div>
                <div> {level.mid}</div>
                <div> {level.foreign}</div>
                <div> {level.small}</div>
            </div>
            <div className="calculator__rebalance-container">
                <p>Please Enter Your Current Portfolio</p>
                <button onClick={handleRebalance} className='calculator__rebalance-button'>Rebalance</button>
            </div>
            <div className="calculator__table">
                <div className="calculator__table_values">
                    <div></div>
                    <div className="calculator__header">Current Amount</div>
                    <div className="calculator__header">Difference</div>
                    <div className="calculator__header">New Amount</div>
                    {headers.map((value, index) => {
                        return (
                            <div key={index} className='rowType'>
                                <label data-label={value}>{value} $</label>
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
        </div>
    );
}