import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import DonutChart from "react-donut-chart";
import HomeTable from "../HomeTable/HomeTable";
import { changeRisk } from "../../redux/actions";
import data from "../../assets/data.json";
import styles from "./styles.module.css";

const mapStateProps = (state) => {
  return {
    selected: state.preference.value,
  };
};

function RiskSelector({ selected, changeRisk }) {
  const [view, setView] = React.useState("table");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected !== 0) {
      navigate("/calculator");
    }
  };

  const handleViewChange = (selection) => {
    if (selected === 0) {
      return;
    }
    setView(selection);
  };

  const parseDonut = (items) => {
    const selectedRisk = items.filter((item) => item.risk == selected);
    return selectedRisk[0].categories.map((item) => ({
      label: item.type,
      value: item.value,
    }));
  };
  return (
    <>
      <div className={styles.home__list}>
        {data.map((level) => (
          <button
            key={level.id}
            className={level.risk == selected ? styles.active : styles.free}
            onClick={() => changeRisk(level.risk)}
            value={level.risk}
          >
            {level.risk}
          </button>
        ))}
        <button
          className={
            selected !== 0 ? "active__button" : "locked__button"
          }
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      <div className={styles.home__view_selector}>
        <button
          className={view == "table" ? styles.active : ""}
          onClick={() => {
            handleViewChange("table");
          }}
        >
          Table view
        </button>
        <button
          className={view == "chart" ? styles.active : ""}
          onClick={() => {
            handleViewChange("chart");
          }}
        >
          Chart view
        </button>
      </div>
      {view == "table" && <HomeTable data={data} selected={selected} />}
      {view == "chart" && (
        <div className={styles.donut__chart}>
          <DonutChart
            data={parseDonut(data)}
            legend={false}
            height="280"
            width="280"
            strokeColor="none"
          />
        </div>
      )}
    </>
  );
}
export default connect(mapStateProps, { changeRisk })(RiskSelector);
