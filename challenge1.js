/* Research difference between Arrow Functions and Regular Functions */

let result;

function oddOrEvenRF(number){
    result = (number%2==0) ? "Even" : "Odd";
    return result;
}

const oddOrEvenAF = (number) => {
    result = (number%2==0) ? "Even" : "Odd";
    return result;
}


console.log("Resultado Función Regular: " + oddOrEvenRF(2));
console.log("Resultado Función Flecha: " + oddOrEvenAF(2));

