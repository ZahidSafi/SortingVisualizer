import React, { useState, useEffect } from 'react';
import Bars from './Bars';
import HeaderControls from './HeaderControls';
import './SortingVisualizer.css';


const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [isAnimationOn, setIsAnimationOn] = useState(false);
    const [animationDelay, setAnimationDelay] = useState(0);
    const [numberOfBars, setNumberOfBars] = useState(200);
    const [currentSort, setCurrentSort] = useState('');

    useEffect(() => {
        if (array.length === 0) {
            resetArray(numberOfBars);
        }
    })

    useEffect(() => {
        setAnimationDelay(animationDelay)
    }, [animationDelay])

    const changeNumberOfBars = (event) => {
        setNumberOfBars(parseInt(event.target.value));
        resetArray(parseInt(event.target.value));
    }

    const resetArray = (numberOfBars) => {
        const array = [];
        for (let i = 5; i < numberOfBars; i++) {
            array.push(i);
        }
        shuffleArray(array)
        setArray(array);
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const changeAnimationDelay = (event) => {
        setAnimationDelay(event.target.value);
    }

    const handleSort = (event) => {
        setCurrentSort(event.target.value);
        setIsAnimationOn(true)
    }

    return (
        <>
            <HeaderControls
                onGenerateArray={resetArray}
                animationDelayValue={animationDelay}
                onChangeAnimationDelay={changeAnimationDelay}
                onSortSelected={handleSort}
                numberOfBarsValue={numberOfBars}
                onNumberOfBarChanged={changeNumberOfBars}
                isAnimationOn={isAnimationOn}/>
            <Bars array={array} currentSort={currentSort} animationDelayValue={animationDelay}
                numberOfBarsValue={numberOfBars}
                onIsSetAnimationOn={setIsAnimationOn}/>

        </>
    )
}

export default SortingVisualizer;