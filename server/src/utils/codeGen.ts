const MIN = parseInt('10000000', 16)
const MAX = parseInt('ffffffff', 16) - MIN + 1

export const codeGen = () => (MIN + Math.random() * MAX >> 0).toString(16)

