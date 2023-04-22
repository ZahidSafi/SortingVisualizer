import React from 'react';
import { Button } from 'antd';
import './SortingVisualizer.css'


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 1000; i++) {
            array.push(randomIntFromInterval(5, 1000));
        }
        this.setState({ array });
    }



    render() {
        const { array } = this.state;

        return (
            <>
                <header>
                    <button onClick={ () => this.resetArray() }>
                        Generate New Array
                    </button>
                    <div>

                        <select>

                            <option value="fruit">Selection Sort</option>

                            <option value="insertionsort">Insertion Sort</option>

                            <option value="quicksort">Quick Sort</option>

                        </select>

                    </div>
                </header>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{ height: `${value}px` }}>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}