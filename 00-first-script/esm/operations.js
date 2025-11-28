const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

export { add, subtract };

// autre possibilité d'exporter directement les fonctions
export const addDirectExport = (a, b) => a + b;
export const subtractDirectExport = (a, b) => a - b;

// ou encore
// export function add(a, b) {
//     return a + b;
// }
// ...


export const myMathModule = {
    add,
    subtract
};

const myMathModuleDefault = {
    add,
    subtract
};
export default myMathModuleDefault;