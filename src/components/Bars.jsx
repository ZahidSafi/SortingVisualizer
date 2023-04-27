import React, {useEffect, useRef, useState } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { insertionSort } from '../algorithms/insertionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';

const Bars = (props) => {
    const arrayContainerRef = useRef(null);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        handleSort(props.currentSort);
    }, [props.currentSort]);

    const swap = (arrayBars, animation) => {
        const tempHeight = arrayBars[animation.index1].style.height;
        arrayBars[animation.index1].style.height = arrayBars[animation.index2].style.height;
        arrayBars[animation.index2].style.height = tempHeight
    }

    const compare = (arrayBars, animation) => {
        arrayBars[animation.index1].style.backgroundColor = 'red';
        arrayBars[animation.index2].style.backgroundColor = 'red';
    }

    const animateBubbleSort = async (animations) => {
        const arrayBars = arrayContainerRef.current.getElementsByClassName('array-bar');
        for (const animation of animations) {
            if (animation.type === 'compare') {
                compare(arrayBars, animation);
            }
            if (animation.type === 'swap') {
                swap(arrayBars, animation)
            }
            await delay(props.animationDelayValue);
            arrayBars[animation.index1].style.backgroundColor = 'white';
            arrayBars[animation.index2].style.backgroundColor = 'white';

        }
    }

    const animateInsertionSort = async (animations) => {
        const arrayBars = arrayContainerRef.current.getElementsByClassName('array-bar');
        for (const animation of animations) {
            if (animation.type === 'current') {
                arrayBars[animation.index1].style.backgroundColor = 'green';
                for (const subAnimation of animation.subAnimations) {
                    if (subAnimation.type === 'compare') {
                        compare(arrayBars, subAnimation);
                        await delay(props.animationDelayValue);
                        arrayBars[subAnimation.index1].style.backgroundColor = 'white';
                        arrayBars[subAnimation.index2].style.backgroundColor = 'white';
                    }
                    if (subAnimation.type === 'overwrite') {
                        arrayBars[subAnimation.index1].style.height = `${subAnimation.value}px`;
                        if (subAnimation.index1 === animation.index1) {
                            arrayBars[subAnimation.index1].style.backgroundColor = 'green';
                        } else {
                            arrayBars[subAnimation.index1].style.backgroundColor = 'white';
                        }
                    }
                }
                arrayBars[animation.index1].style.backgroundColor = 'white';
            }
        }
    }

    const animateMergeSort = async (animations) => {
        const arrayBars = arrayContainerRef.current.getElementsByClassName('array-bar');
        for (const animation of animations) {
            if (animation.type === 'compare') {
                compare(arrayBars, animation);
                await delay(props.animationDelayValue);
            }
            else if (animation.type === 'overwrite') {
                arrayBars[animation.index1].style.height = `${animation.value}px`;
                arrayBars[animation.index1].style.backgroundColor = 'red';
                await delay(props.animationDelayValue);
                arrayBars[animation.index1].style.backgroundColor = 'white';
            }
        }
    }

    const animateQuickSort = async (animations) => {
        const arrayBars = arrayContainerRef.current.getElementsByClassName('array-bar');
        for (const animation of animations) {
            if (animation.type === 'current') {
                arrayBars[animation.index1].style.backgroundColor = 'green';
                for (const subAnimation of animation.subAnimations) {
                    if (subAnimation.type === 'compare') {
                        compare(arrayBars, subAnimation);
                        await delay(props.animationDelayValue);
                        arrayBars[subAnimation.index1].style.backgroundColor = 'white';
                        arrayBars[subAnimation.index2].style.backgroundColor = 'white';
                    }
                    if (subAnimation.type === 'swap') {
                        swap(arrayBars, subAnimation)
                    }
                }
                arrayBars[animation.index1].style.backgroundColor = 'white';
            }
        }
    }

    const checkBars = async () => {
        const arrayBars = arrayContainerRef.current.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = 'green';
            await delay(props.animationDelayValue);
        }
    }

    const handleSort = async (currentSort) => {
        if (currentSort === 'bubble') {
            await animateBubbleSort(bubbleSort(props.array));
        }
        else if (currentSort === 'insertion') {
            await animateInsertionSort(insertionSort(props.array));
        }
        else if (currentSort === 'merge') {
            await animateMergeSort(mergeSort(props.array));
        }
        else if (currentSort === 'quick') {
            await animateQuickSort(quickSort(props.array));
        }
        if (currentSort !== '') {
           await checkBars();
        }
        const arrayBars = arrayContainerRef.current.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = 'white';
        }
        props.onIsSetAnimationOn(false);
    }
    const barWidth = Math.min(100 / props.array.length, 10);
    return (
        <div className="array-container" ref={arrayContainerRef}>
            {props.array.map((value, idx) => (
                <div className="array-bar" key={idx} style={{
                    height: `${(value / props.numberOfBarsValue) * 100}%`,
                    width: `${barWidth}%`
                }}>
                </div>
            ))}
        </div>
    );
}

export default Bars;