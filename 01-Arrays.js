const printFunction = (title, result) => {
    console.log(title, result);
};


let array = [1, 2, 3, 4, 5];

printFunction("Array inicial:", array);
console.log("-------------------------------------------------");

printFunction("at(0):", array.at(0));
printFunction("concat([6,7]):", array.concat([6, 7]));

array.copyWithin(0, 1, 3);
printFunction("copyWithin(0,1,3):", array);

console.log("entries():");
for (const [i, v] of array.entries()) {
    console.log(`  índice ${i}, valor ${v}`);
}

printFunction("every(n > 0):", array.every(n => n > 0));

array.fill(9, 0, 1);
printFunction("fill(9,0,1):", array);

printFunction("filter(n > 2):", array.filter(n => n > 2));
printFunction("find(n === 3):", array.find(n => n === 3));
printFunction("findIndex(n === 3):", array.findIndex(n => n === 3));
printFunction("findLast(n < 5):", array.findLast(n => n < 5));
printFunction("findLastIndex(n < 5):", array.findLastIndex(n => n < 5));

const nested = [1, [2, [3]]];
printFunction("flat(2):", nested.flat(2));
printFunction("flatMap(n => [n, n*2]):", array.flatMap(n => [n, n * 2]));

console.log("forEach():");
array.forEach(n => console.log("  valor:", n));

printFunction("includes(3):", array.includes(3));
printFunction("indexOf(3):", array.indexOf(3));
printFunction("join('-'):", array.join("-"));

console.log("keys():");
for (const k of array.keys()) {
    console.log("  índice:", k);
}

printFunction("lastIndexOf(3):", array.lastIndexOf(3));
printFunction("map(n * 2):", array.map(n => n * 2));

printFunction("pop():", array.pop());
printFunction("Array actual:", array);

array.push(10);
printFunction("push(10):", array);

printFunction("reduce(sum):", array.reduce((a, b) => a + b, 0));
printFunction("reduceRight(resta):", array.reduceRight((a, b) => a - b));

array.reverse();
printFunction("reverse():", array);

printFunction("shift():", array.shift());
printFunction("Array actual:", array);

printFunction("slice(1,3):", array.slice(1, 3));
printFunction("some(n > 3):", array.some(n => n > 3));

array.sort((a, b) => a - b);
printFunction("sort():", array);

array.splice(1, 1, 99);
printFunction("splice(1,1,99):", array);

printFunction("toLocaleString():", array.toLocaleString());
printFunction("toString():", array.toString());

array.unshift(0);
printFunction("unshift(0):", array);

console.log("values():");
for (const v of array.values()) {
    console.log("  valor:", v);
}