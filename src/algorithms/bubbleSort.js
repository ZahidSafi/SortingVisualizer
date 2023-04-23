export const bubbleSort = (array) => {
    let copy = [...array];
    let animations = [];
    let n = array.length;
    for (let i = n-1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            animations.push({ type: 'compare', index1: j, index2: j+1 });
            if (copy[j] > copy[j + 1]) {
                let temp = copy[j + 1];
                copy[j + 1] = copy[j];
                copy[j] = temp;
                animations.push({ type: 'swap', index1: j, index2: j + 1 });
            }
        }
        
    }
    return animations;
}


