import React from "react";
import {useNavigate } from "react-router-dom";
import DonutChart from 'react-donut-chart';
import HomeTable from "../components/HomeTable/HomeTable";
import "./views.css"


export default function Home({ data }) {
    const [selected, setSelected] = React.useState(0);
    const [view, setView] = React.useState('table');
    console.log(data);
    const navigate = useNavigate();

    const handleSelection = (event) => {
        setSelected( Number.parseInt(event.target.value));
    };

    const handleContinue = (event) => {
        if(selected !== 0){
            navigate('/calculator');
        }
    };

    const handleViewChange = (selection) => {
        if(selected === 0){
            return;
        }
        setView(selection);
    };

    const parseDonut = (items) => {
        const selectedRisk = items.filter(item => (item.risk == selected));
        return selectedRisk[0].categories.map(item => (
            {
                label: item.type,
                value: item.value
            }
        ));
    };
    

    return (
        <div className="home__container">
            <h2 className="home__title">Please Select A Risk Level For Your Investment Portfolio</h2>
            <div className="home__list">
                {
                    data.map(level =>{
                        return(
                            <button key={level.id} className={(level.risk == selected) ? 'selected-level' : 'free-level'} onClick={handleSelection} value={level.risk}>{level.risk}</button>                        
                    )})
                }
                <button className={selected !== 0 ? 'home__list_continue' : 'home__list_continue locked'}
                    onClick={handleContinue}>Continue</button>
            </div>
            <div className="home__view-selector">
                <button className={view == 'table' ? 'selected' : ''} onClick={() => {handleViewChange('table')}}>Table view</button>
                <button className={view == 'chart' ? 'selected' : ''} onClick={() => {handleViewChange('chart')}}>Chart view</button>
            </div>

            {view == 'table' && <HomeTable data={data} selected={selected}/>}
            {view == 'chart' && 
            <div className="donut__chart">            
                <DonutChart data={parseDonut(data)} legend={false} height='250' width='250' strokeColor='none'/>
                </div>
            }
        </div>
    );
}