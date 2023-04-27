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
            <button disabled={props.isAnimationOn} onClick={handleArrayReset}>
                Generate New Array
            </button>
            <div className="algorithms-select">
                <select disabled={props.isAnimationOn} onChange={handleSortSelected} className="algorithms">
                    <option value="">Select Sort</option>
                    <option value="bubble">Bubble Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quick Sort</option>
                </select>
            </div>
            <div className="animation-delay">
                <input disabled={props.isAnimationOn} className="range-slider" type="range" min="0" max="100" value={props.animationDelayValue} onChange={handleAnimationDelayChange} />
                <span className = "range-slider-value">{props.animationDelayValue}</span>
            </div>

            <div className="number-of-bars">
                <input disabled={props.isAnimationOn}
                    className="range-slider"
                    type="range"
                    min="200"
                    max="600"
                    value={props.numberOfBarsValue}
                    onChange={handleNumberOfBarChange}
                />
                <span className="range-slider-value">{props.numberOfBarsValue}</span>
            </div>

        </header>
    );
}

export default HeaderControls;