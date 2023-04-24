import React from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { insertionSort } from '../algorithms/insertionSort';
import './SortingVisualizer.css';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            timeout: 0,
            numberOfBars: 50,
        };

        this.changeNumberOfBars = this.changeNumberOfBars.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    changeNumberOfBars(event) {
        this.setState({ numberOfBars: parseInt(event.target.value) }, () => {
            this.resetArray(this.state.numberOfBars);
        });
    }

    resetArray(numberOfBars) {
        const array = [];
        for (let i = 5; i < numberOfBars; i++) {
            array.push(i * 2);
        }
        this.shuffleArray(array)
        this.setState({ array });
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    swap(arrayBars, animation) {
        const tempHeight = arrayBars[animation.index1].style.height;
        arrayBars[animation.index1].style.height = arrayBars[animation.index2].style.height;
        arrayBars[animation.index2].style.height = tempHeight
    }

    compare(arrayBars, animation) {
        arrayBars[animation.index1].style.backgroundColor = 'red';
        arrayBars[animation.index2].style.backgroundColor = 'red';
    }

    async animateBubbleSort(animations) {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            if (animation.type === 'compare') {
                this.compare(arrayBars, animation);
            }
            if (animation.type === 'swap') {
                this.swap(arrayBars, animation)
            }
            await new Promise((resolve) => setTimeout(resolve, this.state.timeout));
            arrayBars[animation.index1].style.backgroundColor = 'white';
            arrayBars[animation.index2].style.backgroundColor = 'white';

        }
    }

    async animateInsertionSort(animations) {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            if (animation.type === 'compare') {
                this.compare(arrayBars, animation);
            }
            if (animation.type === 'swap') {
                this.swap(arrayBars, animation)
            }
            if (animation.type === 'overwrite') {
                arrayBars[animation.index1].style.height = `${animation.value}px`;
            }
            await new Promise((resolve) => setTimeout(resolve, this.state.timeout));

            arrayBars[animation.index1].style.backgroundColor = 'white';

            if (animation.type === 'compare') {
                arrayBars[animation.index2].style.backgroundColor = 'white';
            }

        }
    }

    handleSort(event) {
        const value = event.target.value;
        if (value === 'bubble') {
            this.animateBubbleSort(bubbleSort(this.state.array));
        }
        else if (value === 'insertion') {
            this.animateInsertionSort(insertionSort(this.state.array));
        }
    }

    changeTimeout(event) {
        this.setState({ timeout: event.target.value });
    }





    render() {
        const { array } = this.state;
        const screenWidth = window.innerWidth;
        const numberOfBars = array.length;
        const barWidth = Math.floor(screenWidth / numberOfBars) - 2;
        return (
            <>
                <header>
                    {/*<button className="pause-button">*/}
                    {/*    <div className="pause-icon"></div>*/}
                    {/*    <div className="pause-icon"></div>*/}
                    {/*</button>*/}
                    <button onClick={() => this.resetArray(this.state.numberOfBars)}>
                        Generate New Array
                    </button>
                    <select onChange={(event) => this.handleSort(event)} className="algorithms">
                        <option value="">None</option>
                        <option value="bubble">Bubble Sort</option>
                        <option value="insertion">Insertion Sort</option>
                    </select>
                    <label htmlFor="num-bars">Speed:</label>
                    <input type="range" min="0" max="100" value={this.state.timeout} onChange={(event) => this.changeTimeout(event)} />
                    <label htmlFor="num-bars">Number of Bars:</label>
                    <input
                        type="range"
                        min="10"
                        max="500"
                        value={this.state.numberOfBars}
                        onChange={this.changeNumberOfBars}
                    />
                </header>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{
                            height: `${value}px`,
                            width: `${barWidth}px`
                        }}>
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