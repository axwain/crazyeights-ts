export function shuffleArray<T> (array: T[]) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i]
        const otherIndex = Math.floor(Math.random() * array.length)
        array[i] = array[otherIndex]
        array[otherIndex] = item
    }
}

