import React from "react";
import { connect } from "react-redux";
import {
  balanceData,
  calculateItemsToBalance,
} from "../../utilities/utilities";
import data from "../../assets/data.json";
import { zeroState } from "../../assets/constants";
import styles from "./styles.module.css";

const mapStateProps = (state) => {
  let risk;
  if (state.preference.value == 0) {
    risk = { ...zeroState };
  } else {
    risk = data.filter((risk) => risk.risk === state.preference.value)[0];
  }
  return {
    selected: state.preference.value,
    risk: risk,
  };
};

function Calculator({ risk, selected }) {
  const [recomendations, setRecommendations] = React.useState([]);

  const verifyNumbers = () => {
    if (risk.risk == 0) {
      setRecommendations(['Please, select your preference']);
      return false;
    }
    let table = Array.from(
      document.querySelectorAll("." + styles.calculator__table_row)
    );
    let allValid = table.every(
      (row) => parseFloat(row.querySelector(".user_input").value) >= 0
    );
    if(!allValid){
      setRecommendations(['Please, numbers have to be positive when a preference is selected']);
    }
    return allValid;
  };

  const getRecomendations = (exceedArray, lackArray) => {
    const recomendationsList = balanceData(exceedArray, lackArray);
    setRecommendations([...recomendationsList]);
  };

  const handleRebalance = () => {
    let allValid = verifyNumbers();
    if (!allValid) {
      return;
    }
    let table = document.querySelectorAll("." + styles.calculator__table_row);
    let { valuesToTransfer, valuesToAdd } = calculateItemsToBalance(table);
    getRecomendations([...valuesToTransfer], [...valuesToAdd]);
  };

  return (
    <>
      <div className="table_header row">
        {selected !== 0 && <div>Risk</div>}
        {selected !== 0 &&
          risk.categories.map((level, index) => (
            <div key={index}>{level.type}</div>
          ))}
      </div>
      <div className="row">
      {selected !== 0 && <div>{selected}</div>}
        {selected !== 0 &&
          risk.categories.map((level, index) => (
            <div key={index}>{level.value} %</div>
          ))}
      </div>
      <div className={styles.rebalance_container}>
        <p>Please Enter Your Current Portfolio</p>
        <button
          onClick={handleRebalance}
          className={risk.risk == 0 ? "locked__button" : "active__button"}
        >
          Rebalance
        </button>
      </div>
      <div className={styles.calculator__table}>
        <div className={styles.calculator__table_values}>
          <div className={styles.calculator__header}></div>
          <div className={styles.calculator__header}>Current Amount</div>
          <div className={styles.calculator__header}>Difference</div>
          <div className={styles.calculator__header}>New Amount</div>
          {risk.categories.map((level, index) => {
            return (
              <div
                key={index}
                className={styles.calculator__table_row}
                data-weight={level.value}
              >
                <label data-label={level.type}>{level.type} $</label>
                <input type="number" min="0" className="user_input" />
                <input
                  type="number"
                  className="user_difference"
                  disabled
                ></input>
                <input type="number" className="user_new" disabled></input>
              </div>
            );
          })}
        </div>
        <div className={styles.calculator__table_recommendation}>
          <div className={styles.calculator__header}>Recommended Transfers</div>
          <div>
            <ul>
              {recomendations.map((recomendation, index) => (
                <li key={index}>{recomendation}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default connect(mapStateProps, null)(Calculator);
