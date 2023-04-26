import { compare, swap } from "./ArrayHelpers";

export const bubbleSort = (array) => {
    let copy = [...array];
    let animations = [];
    let n = array.length;
    for (let i = n - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (compare(animations, copy, j, j + 1)) {
                swap(animations, copy, j, j + 1);
            }
        }

    }
    return animations;
}


