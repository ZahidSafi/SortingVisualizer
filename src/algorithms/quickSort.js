import { compareWithEqual, swap } from "./ArrayHelpers";

export const quickSort = (array) => {
    let copy = [...array];
    let animations = [];
    quickSortRecursive(animations, copy, 0, copy.length - 1); 
    return animations;
}

export const quickSortRecursive = (animations, copy, left, right) => {
    if (left < right) {
        const pivotIndex = partition(animations, copy, left, right);
        quickSortRecursive(animations, copy, left, pivotIndex - 1);
        quickSortRecursive(animations, copy, pivotIndex + 1, right);
    }
}

export const partition = (animations, copy, left, right) => {
    let pivot = right;
    let i = left;
    let currentAnimation = { type: 'current', index1: pivot, subAnimations: [] };
    for (let j = left; j < right; j++) {
        compareWithEqual(currentAnimation.subAnimations, copy, pivot, j);
        if (copy[j] <= copy[pivot]) {
            swap(currentAnimation.subAnimations, copy, i, j);
            i++;
        }
    }
    swap(currentAnimation.subAnimations, copy, i, pivot);
    animations.push(currentAnimation);
    return i;
}