import React from 'react';

const HeaderControls = (props) => {

    const handleSortSelected = (event) => {
        props.onSortSelected(event);
    }
    const handleArrayReset = (numberOfBars) => {
        props.onGenerateArray(numberOfBars);
    }

    const handleAnimationDelayChange = (event) => {
        props.onChangeAnimationDelay(event);
    }

    const handleNumberOfBarChange = (event) => {
        props.onNumberOfBarChanged(event);
    }


    return (
        <header>
            <button onClick={handleArrayReset}>
                Generate New Array
            </button>
            <div className="algorithms-select">
                <select onChange={handleSortSelected} className="algorithms">
                    <option value="None">None</option>
                    <option value="bubble">Bubble Sort</option>
                    <option value="insertion">Insertion Sort</option>
                </select>
            </div>
            <div className="animation-delay">
                <label htmlFor="num-bars">Speed:</label>
                <input type="range" min="0" max="100" value={props.animationDelayValue} onChange={handleAnimationDelayChange} />
            </div>
            
            <div className="number-of-bars">
                <label htmlFor="num-bars">Number of Bars:</label>
                <input
                    type="range"
                    min="10"
                    max="500"
                    value={props.numberOfBarsValue}
                    onChange={handleNumberOfBarChange}
                />
            </div>
            
        </header>
    );
}

export default HeaderControls;