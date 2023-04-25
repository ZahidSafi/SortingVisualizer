import React, { useState, useEffect, useRef } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { insertionSort } from '../algorithms/insertionSort';

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


    const handleSort = (currentSort) => {
        if (currentSort === 'bubble') {
            animateBubbleSort(bubbleSort(props.array));
        }
        else if (currentSort === 'insertion') {
            animateInsertionSort(insertionSort(props.array));
        }
    }
    const barWidth = Math.floor(window.innerWidth / props.array.length) - 2;
  return (
      <div className="array-container" ref={arrayContainerRef}>
          {props.array.map((value, idx) => (
              <div className="array-bar" key={idx} style={{
                  height: `${value}px`,
                  width: `${barWidth}px`
              }}>
              </div>
          ))}
      </div>
  );
}

export default Bars;