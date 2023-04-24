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
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(5, 1000));
        }
        this.setState({ array });
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

        return (
            <>
                <header>
                    {/*<button className="pause-button">*/}
                    {/*    <div className="pause-icon"></div>*/}
                    {/*    <div className="pause-icon"></div>*/}
                    {/*</button>*/}
                    <button onClick={() => this.resetArray()}>
                        Generate New Array
                    </button>
                    <select onChange={(event) => this.handleSort(event)} className="algorithms">
                        <option value="">None</option>
                        <option value="bubble">Bubble Sort</option>
                        <option value="insertion">Insertion Sort</option>
                    </select>
                    <input type="range" min="0" max="100" value={this.state.timeout} onChange={(event) => this.changeTimeout(event)} />
                </header>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{
                            height: `${value}px`,
                            width: '75px'
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