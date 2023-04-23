import React from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import './SortingVisualizer.css';


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
        for (let i = 0; i < 50; i++) {
            array.push(randomIntFromInterval(5, 1000));
        }
        this.setState({ array });
    }

    async animateSort(animations) {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            if (animation.type === 'compare') {
                arrayBars[animation.index1].style.backgroundColor = 'red';
                arrayBars[animation.index2].style.backgroundColor = 'red';
            }
            if (animation.type === 'swap') {
                const tempHeight = arrayBars[animation.index1].style.height;
                arrayBars[animation.index1].style.height = arrayBars[animation.index2].style.height;
                arrayBars[animation.index2].style.height = tempHeight
            }
            await new Promise((resolve) => setTimeout(resolve, 0));
            arrayBars[animation.index1].style.backgroundColor = 'white';
            arrayBars[animation.index2].style.backgroundColor = 'white';
        }
    }

    handleBubbleSort() {
        const animations = bubbleSort(this.state.array);
        this.animateSort(animations);
    }





    render() {
        const { array } = this.state;

        return (
            <>
                <header>
                    <button class="pause-button">
                        <div class="pause-icon"></div>
                        <div class="pause-icon"></div>
                    </button>
                    <button onClick={() => this.resetArray()}>
                        Generate New Array
                    </button>
                    <button onClick={() => this.handleBubbleSort()}>Bubble Sort</button>
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