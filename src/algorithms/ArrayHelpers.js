export const swap = (animations, array, left, right) => {
    let temp = array[right];
    array[right] = array[left];
    array[left] = temp;
    animations.push({ type: 'swap', index1: left, index2: right});
}

export const compare = (animations, array, left, right) => {
    animations.push({ type: 'compare', index1: left, index2: right });
    return array[left] > array[right];
}
export const compareWithEqual = (animations, array, left, right) => {
    animations.push({ type: 'compare', index1: left, index2: right });
    return array[left] >= array[right];
}

export const overwrite = (animations, array, index, value) => {
    array[index] = value;
    animations.push({ type: 'overwrite', index1: index, value: value });
}