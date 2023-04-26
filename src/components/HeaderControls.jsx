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
                    <option value="">Select Sort</option>
                    <option value="bubble">Bubble Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                </select>
            </div>
            <div className="animation-delay">
                <input type="range" min="0" max="100" value={props.animationDelayValue} onChange={handleAnimationDelayChange} />
                <span>{props.animationDelayValue}</span>
            </div>

            <div className="number-of-bars">
                <input
                    type="range"
                    min="10"
                    max="500"
                    value={props.numberOfBarsValue}
                    onChange={handleNumberOfBarChange}
                />
                <span>{props.numberOfBarsValue}</span>
            </div>

        </header>
    );
}

export default HeaderControls;