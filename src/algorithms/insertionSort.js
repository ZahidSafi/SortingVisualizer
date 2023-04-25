export const insertionSort = (array) => {
    let copy = [...array];
    let animations = [];
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let current = copy[i];
        let currentAnimation = { type: 'current', index1: i, subAnimations: [] };
        let j = i - 1
        while (j >= 0 && current < copy[j]) {
            currentAnimation.subAnimations.push({ type: 'compare', index1: j, index2: j + 1 });
            copy[j + 1] = copy[j];
            currentAnimation.subAnimations.push({ type: 'overwrite', index1: j + 1, value: copy[j] });
            j--;
        }
        copy[j + 1] = current;
        currentAnimation.subAnimations.push({ type: 'overwrite', index1: j + 1, value: current });
        animations.push(currentAnimation);
    }
    return animations;
}


