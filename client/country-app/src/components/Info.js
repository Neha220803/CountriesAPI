import React from 'react';
import '../App.css';

function Info(lastSavedCountry) {
    return (
        <div className="d-flex align-items-center"> {/* Apply flex classes here */}
            <img className="me-4 flag" src={lastSavedCountry.flag} alt="Flag" /> {/* Ensure to add the alt attribute for accessibility */}
            <div>
                <h4>General Info:</h4>
                <h6>Country Name: {lastSavedCountry.name}</h6>
                <h6>Capital: {lastSavedCountry.capital}</h6>
                <h6>Currency: {lastSavedCountry.currency}</h6>
                <h6>Timezone: {lastSavedCountry.timeZone}</h6>
            </div>
        </div>
    )
}

export default Info;


//https://www.youtube.com/watch?v=i9oX1upSKjI&t=116s
