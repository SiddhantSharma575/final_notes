// higher order function is a function that takes a function as an argument or returns a function

function x() {
    console.log("x");
}

function y(x) {
    x();
}

y(x);

// output:
// x


const radius = [3, 1, 2, 4];

const area = (radius) => {
    return Math.PI * radius * radius;
}

const circumference = (radius) => {
    return 2 * Math.PI * radius;
}


const calculate = (radius, logic) => {
    let output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]));
    }
    return output;
}

console.log(calculate(radius, area));
console.log(calculate(radius, circumference));



// output:
// [28.27, 3.14, 12.57, 50.27]

//  pure function is a function that does not depend on external state and always returns the same output for the same input

const pureFunction = (radius) => {
    return Math.PI * radius * radius;
}

console.log(pureFunction(radius));

// output:
// [28.27, 3.14, 12.57, 50.27]

// polyfill for map

const ott = radius.map((arr) => {
  return area(arr)
})

console.log(ott)

// map polyfill

const myMap = (arr, logic) => {
    let output = [];
    for(let i=0; i<arr.length; i++) {
        output.push((logic(arr[i])));
    }
    return output;
}



console.log(myMap(radius, area)); 

// more accurate polyfil wiil be 

Array.prototype.myMap = function(logic) {
    let output = [];
    for(let i=0; i<this.length; i++) {
        output.push((logic(this[i])));
    }
    return output;
}

console.log(radius.myMap(area));

// output:
// [28.27, 3.14, 12.57, 50.27]


// filter polyfill

const arr = [1,2,3,4,5,6];

const evenArr = arr.filter((curr) => curr % 2 === 0);

console.log("Even Array", evenArr)

// filter polyfill

Array.prototype.myFilter = function(logic){
    let output = [];
    for(let i=0; i<this.length; i++) {
        if(logic(this[i])) {
            output.push(this[i]);
        }
    }
    return output;
}

const evenCheck = (num) => num % 2 === 0 ? true : false

console.log("even check", evenCheck(2))

console.log("my", arr.myFilter(evenCheck));

// reduce used to reduce the array to a single value
//   - it used to perform operation on values of array and return a single value

// sum of array

const arr2 = [1,2,3,4,5,6];

function sumOfTwo (num1, num2) {
    return num1 + num2
}


const sumval = arr2.reduce((acc, curr) => {
    acc = acc + curr;
    return acc;
}, 0)

console.log("sum", sumval)

// polyfill of reduce 
Array.prototype.myReduce = function(cb, intialVale){
    if(typeof cb !== "function") {
        throw new Error("callback must be an function")
    }
    let acc = intialVale !== undefined ? intialVale : this[0];
    for(let i = intialVale !== undefined ? 0 : 1; i<this.length; i++) {
        acc = cb(acc, this[i], i, this);
    }
    return acc;
}

console.log("Sum of array", arr2.myReduce(sumOfTwo,0))