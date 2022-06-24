import React from "react";
import { useNavigate } from "react-router-dom";
import DonutChart from "react-donut-chart";
import HomeTable from "../components/HomeTable/HomeTable";
import { connect } from "react-redux";
import { changeRisk } from "../redux/actions";
import data from "../assets/data.json";
import "./views.css";

const mapStateProps = (state) => {
  return {
    selected: state.preference.value,
  };
};
function Home({ selected, changeRisk }) {
  const [view, setView] = React.useState("table");
  const navigate = useNavigate();

  const handleContinue = (event) => {
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
    <div className="home__container">
      <h2 className="home__title">
        Please Select A Risk Level For Your Investment Portfolio
      </h2>
      <div className="home__list">
        {data.map((level) => (
          <button
            key={level.id}
            className={level.risk == selected ? "active" : "free-level"}
            onClick={() => changeRisk(level.risk)}
            value={level.risk}
          >
            {level.risk}
          </button>
        ))}
        <button
          className={
            selected !== 0
              ? "home__list_continue"
              : "home__list_continue locked"
          }
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      <div className="home__view-selector">
        <button
          className={view == "table" ? "active" : ""}
          onClick={() => {
            handleViewChange("table");
          }}
        >
          Table view
        </button>
        <button
          className={view == "chart" ? "active" : ""}
          onClick={() => {
            handleViewChange("chart");
          }}
        >
          Chart view
        </button>
      </div>
      {view == "table" && <HomeTable data={data} selected={selected} />}
      {view == "chart" && (
        <div className="donut__chart">
          <DonutChart
            data={parseDonut(data)}
            legend={false}
            height="280"
            width="280"
            strokeColor="none"
          />
        </div>
      )}
    </div>
  );
}
export default connect(mapStateProps, { changeRisk })(Home);
