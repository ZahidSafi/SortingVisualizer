import { overwrite } from "./ArrayHelpers";

export const mergeSort = (array) => {
    let copy = [...array];
    let animations = [];
    mergeSortRecursive(animations, copy, 0, copy.length - 1);
    return animations;
}

const mergeSortRecursive = (animations, copy, left, right) => {
    if (left < right) {

        let middleIndex = Math.floor((left + right) / 2);
        mergeSortRecursive(animations, copy, left, middleIndex);
        mergeSortRecursive(animations, copy, middleIndex + 1, right);
        merge(animations,copy, left, middleIndex, right);
    }
}

const merge = (animations, copy, start, middle, end) => {
    const leftLength = middle - start + 1;
    const rightLength = end - middle;

    // Create temporary arrays for left and right halves
    const left = Array(leftLength);
    const right = Array(rightLength);

    // Copy data to temporary arrays
    for (let i = 0; i < leftLength; i++) {
        left[i] = copy[start + i];
    }
    for (let i = 0; i < rightLength; i++) {
        right[i] = copy[middle + 1 + i];
    }

    let i = 0; // Index for left array
    let j = 0; // Index for right array
    let k = start; // Index for merged array

    // Merge the temporary arrays back into the main array
    while (i < leftLength && j < rightLength) {
        if (left[i] <= right[j]) {
            copy[k] = left[i];
            overwrite(animations, copy, k, left[i]);
            i++;
        } else {
            copy[k] = right[j];
            overwrite(animations, copy, k, right[j]);
            j++;
        }
        k++;
        
    }

    // Copy remaining elements of left array, if any
    while (i < leftLength) {
        copy[k] = left[i];
        overwrite(animations, copy, k, left[i]);
        i++;
        k++;
    }

    // Copy remaining elements of right array, if any
    while (j < rightLength) {
        copy[k] = right[j];
        overwrite(animations, copy, k, right[j]);
        j++;
        k++;
    }
}

