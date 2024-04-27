import React, { useEffect, useRef, useState } from 'react';
import '../App.css'; // Import the CSS file

const Gauge = ({ level }) => {
    const gaugeRef = useRef(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(mapLevelToValue(level));
    }, [level]);

    useEffect(() => {
        setGaugeValue(gaugeRef.current, value);
    }, [value]);

    const mapLevelToValue = (level) => {
        switch (level) {
            case 'low':
                return 0.25;
            case 'medium':
                return 0.5;
            case 'high':
                return 0.9;
            default:
                return 0;
        }
    };

    const setGaugeValue = (gauge, value) => {
        if (value < 0 || value > 1) {
            return;
        }
        gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2}turn)`;
        gauge.querySelector(".gauge__cover").textContent = `${level}`;
    };

    return (
        <div className="gauge" ref={gaugeRef}>
            <h4>Population: </h4>
            <div className="gauge__body">

                <div className={`gauge__fill ${level}`}></div>
                <div className="gauge__cover"></div>
            </div>
        </div>
    );
};

export default Gauge;
