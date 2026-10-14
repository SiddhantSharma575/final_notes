// // function statement
// function sayHello() {
//     console.log("Hello");
// }
// sayHello();

// // function expression
// const sayHello = function() {
//     console.log("Hello");
// }
// sayHello();

// // function declaration     
// function sayHello() {
//     console.log("Hello");
// }
// sayHello();

// const sayHello = function() {
//     console.log("Hello");
// }
// sayHello();

// // function declaration vs function expression  
// function sayHello() {
//     console.log("Hello");
// }
// sayHello();

// const sayHello = function() {
//     console.log("Hello");
// }
// sayHello();

// // difference between two is hoisting.
// // function statement is hoisted and function expression is not hoisted.
// // function statement is loaded before the code is executed and function expression is loaded after the code is executed.
// // function statement is loaded before the code is executed and function expression is loaded after the code is executed.
// // calling before declaration is possible in function statement but not in function expression.


// // anonymous function
// const sayHello = function() {
//     console.log("Hello");
// }
// sayHello();

// // named function expression
// const sayHello = function sayHello() {
//     console.log("Hello");
// }
// sayHello();

// // paramtere vs arguments
// function sayHello(name) {
//     console.log("Hello", name);
// }

// // arguments are the values passed to the function.
// sayHello("John");

// // default parameters
// function sayHello(name = "John", age = 20) {
//     console.log("Hello", name, age);
// }
// sayHello();

// // rest parameters
// function sayHello(...args) {
//     console.log(args);
// }
// sayHello(1, 2, 3, 4, 5);

// // first class function
// // ability to use functions as values and pass them around like any other value.
// //   - function are treated as first class citizens in javascript.
// //   - function can be passed as arguments to other functions.
// //   - function can be returned from other functions.
// //   - function can be assigned to variables.
// //   - function can be stored in arrays.
// //   - function can be stored in objects.
// //   - function can be stored in maps.
// //   - function can be stored in sets.


// // arrow function
// // a more concise way to write functions.
// //   - arrow function is a shorter syntax for writing functions.
// //   - arrow function is a more concise way to write functions.
// //   - arrow function is a more concise way to write functions.

// const sayHello = () => {
//     console.log("Hello");
// }
// sayHello();

// const sayHello = (name) => {
//     console.log("Hello", name);
// }
// sayHello("John");

// const sayHello = (name) => {    
//     return "Hello" + name;
// }
// sayHello("John");

// const sayHello = (name) => "Hello" + name;
// sayHello("John");

// const sayHello = (name) => {
//     return "Hello" + name;
// }
// sayHello("John");


// // callback function
// // a function that is passed as an argument to another function.
// //   - callback function is a function that is passed as an argument to another function.
// //   - outer function has responsibility to call the callback function.

// setTimeout(function() {
//     console.log("Hello");
// }, 5000);

// function x(y) {
//     console.log("x");
//     y()
// }
// x(function y() {
//     console.log("y");
// });

// closure 


// document.getElementById("btn").addEventListener("click", function() {
//     console.log("Button clicked");
// });

// function attachEvent() {
//     let count = 0;
//     document.getElementById("btn").addEventListener("click", function() {
//         console.log("Button clicked", ++count);
//     });
// }
// attachEvent();

// garbage collection and remove event listener
// Garbage collection frees memory that nothing can reach anymore.
// An event listener keeps its function alive, and that function keeps
// its closure (`count`) alive. `count` cannot be collected until the
// listener is removed.
// removeEventListener needs the same function that was added, so the
// handler has to be a named reference. An anonymous function cannot be removed.

function attachEvent() {
    let count = 0;
    const button = document.getElementById("btn");

    function handleClick() {
        console.log("Button clicked", ++count);
    }

    button.addEventListener("click", handleClick);

    // Demo only: drop the listener after 10s so the closure can be collected.
    setTimeout(function () {
        button.removeEventListener("click", handleClick);
        console.log("Listener removed. count can now be garbage collected.");
    }, 10000);
}
attachEvent();
