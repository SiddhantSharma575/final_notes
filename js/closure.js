// function x() {
//     var x = 7;
//     function y() {
//         console.log(x);
//     }
//     return y;
// }

// var z = x();
// z();

// closures used in
//   - module design pattern
//   - currying
//   - function like once
//   - memoize
//   - maintain state in async world
//   - setTimeouts
//   - Iterators and generators


// function x() {
//     var i = 1
//     setTimeout(function() {
//         console.log(i);
//     }, 1000);
//     console.log("Hello");
// }

// x();

// function x1() {
//     for(var i = 1; i <= 5; i++) {
//         setTimeout(function() {
//             console.log(i);
//         }, 1000);
//     }
// }

// x1();


// it is working this way because of closure. let is block scoped and it is not hoisted. so it is working as expected.
// it keep the reference of the i variable in the closure and it is not value of i variable. so it is working as expected.


// function x2() {
//     for(let i = 1; i <= 5; i++) {
//         setTimeout(function() {
//             console.log(i);
//         }, 1000);
//     }
// }

// x2();

// let is block scoped and it is not hoisted. so it is working as expected.
// it keep the reference of the i variable in the closure and it is not value of i variable. so it is working as expected.
// i holds new copy of i variable for each iteration. so it is working as expected.


// without let, you can 

// function x3() {
//     for(var i = 1; i <= 5; i++) {
//         function close(i) {
//             setTimeout(function() {
//                 console.log(i);
//             }, 1000);
//         }
//         close(i);
//     }
// }

// x3();

// This prints 1, 2, 3, 4, 5 even though the loop uses var.
// var i is still one shared variable for the whole function. By the time the
// timers run, that loop i is already 6. That is not the i the callbacks use.
// close(i) is called on every iteration and passes the current number in.
// The parameter i is a new binding for that call, and it shadows the loop i.
// The setTimeout callback closes over that parameter. The parameter never
// changes after the call, so each timer keeps its own value: 1, then 2, and so on.

// closure interview questions

// function outer(b) {
//     function inner(a) {
//         return a + b;
//     }
//     return inner;
// }

// var closure = outer(1);
// console.log(closure(2));

// output: 3

// closure is a function that has access to the variables of its outer function.
// even after the outer function has returned.

// function outest(c) {
//     function outer(b) {
//         function inner (){
//             return a + b + c;
//         }
//         // let a = 10;
//         return inner;
//     }
//     return outer;
// }

// let a = 10;
// var closure = outest(1);
// var closure2 = closure(2);
// console.log(closure2());

// output: 6

// closure is a function that has access to the variables of its outer function.
// even after the outer function has returned.


// advantages of closures
//   - data privacy
    //    - for example, you can create a function that returns a function and the returned function has access to the variables of its outer function. this is useful for data privacy.
//   - module design pattern
//   - currying
//   - function like once
//   - memoize
//   - maintain state in async world
//   - setTimeouts
//   - Iterators and generators


// data hinding and encapuslation is achieved using closures.
// for example, you can create a function that returns a function and the returned function has access to the variables of its outer function. this is useful for data privacy.
// for example, you can create a function that returns a function and the returned function has access to the variables of its outer function. this is useful for data privacy.


// var count = 0;

function counter() {
    var count = 0;
    return function() {
        count++;
        console.log(count);
    }
}
// console.log("count", count);
var counter1 = counter()
counter1();
counter1();
var counter2 = counter();
counter2();
counter2();


// best way to implmenet counter is using constructor function.
function Counter() {
    var count = 0;
    this.increment = function() {
        count++;
        console.log(count);
    }
    this.decrement = function() {
        count--;
        console.log(count);
    }
}

var counter3 = new Counter();
counter3.increment();
counter3.increment();
counter3.decrement();
counter3.decrement();

// best way to implmenet counter is using constructor function.
// constructor function is a function that creates a new object.
// it is used to create multiple instances of the same object.
// it is used to create multiple instances of the same object.


// disadvantages of closures
//   - memory: the inner function keeps its outer variables alive.
//     those variables stay in memory until the closure itself is unreachable.
//     if you hold the function longer than you need (a global, a timer, an
//     event listener you never remove), that memory stays allocated. that is
//     the leak people mean. the closure is not leaking by existing. it leaks
//     when you forget to drop the reference to it.
//   - performance: closed-over variables live on the heap, not in a register
//     or on the stack, because they must outlive the outer call. creating a
//     lot of closures (a function per list item, a large object closed over
//     when you only needed one field) uses more memory and gives the garbage
//     collector more work.


// a closure pins whatever it closes over, even the parts it never reads.
function leaky() {
    var big = new Array(1000000).fill("x");
    var id = 1;
    return function () {
        console.log(id);
    };
}
// var handler = leaky();
// big is still alive here, because handler's environment still points at it.
// handler = null;  // now the function and big can both be collected.


// what is garbage collection?
// memory a program no longer needs has to be taken back, or the process grows
// until it runs out. garbage collection is the runtime doing that for you.
// you allocate (objects, arrays, functions). you do not free.
// an object is garbage when nothing the program can still reach points at it.
// the collector finds those objects and reclaims their memory.
// roots are the starting points: the global object, and whatever the current
// call stack is holding. anything you can walk to from a root is alive.
// anything you cannot walk to is garbage.


// what is reference counting?
// every object keeps a count of how many references point at it.
// create a reference, count goes up. drop a reference, count goes down.
// when the count hits 0, nothing points at the object, so it is freed.
// it is simple, and it frees memory the moment the last reference goes away.
// it fails on cycles:
//   a = {}; b = {};
//   a.friend = b; b.friend = a;
//   a = null; b = null;
// each object still has a count of 1, because they point at each other.
// nothing else can reach them, but the count never hits 0, so they leak.
// old IE used reference counting for DOM nodes. a JS closure that pointed at
// a DOM node, while that node pointed back into JS, formed a cycle and leaked.
// modern javascript engines do not use reference counting as the main collector.


// what is mark and sweep?
// the algorithm modern engines actually use. it does not count references.
// it asks one question: can this object be reached from a root?
//   1. mark. start at the roots (globals, stack). mark every object you can
//      reach by following references. follow cycles too. they get marked once
//      and the walk stops, so a cycle of reachable objects stays alive, and a
//      cycle of unreachable objects stays unmarked.
//   2. sweep. walk the heap. free every object that was not marked.
// cycles are fine, because reachability does not care who points at whom,
// only whether a root can still get there.
// real engines add to this. V8 splits the heap by age (most objects die young,
// so it collects the young space often and the old space rarely), and it marks
// in small slices and on a background thread so the page does not freeze for
// one long pause.


// what is garbage collection in javascript?
// javascript is garbage collected. there is no free() and no delete that
// releases an object. delete only removes a property.
// an object, array, or function becomes collectable when no reachable
// reference points at it:
//   - a local variable, when the function that owns it returns, unless a
//     closure captured it
//   - a property, when you assign null or undefined over it, or delete it
//   - a closure's outer variables, when the closure itself becomes unreachable
// the closure case is the one that surprises people. returning an inner
// function, or passing it to setTimeout or addEventListener, keeps the whole
// outer environment alive, not just the one variable the inner function reads.
// to let that memory go, drop the function: clear the timer, remove the
// listener, or set the variable that holds the function to null.


// relation between closure and garbage collection
// a closure is a function plus a hidden reference to the environment it was
// created in. garbage collection frees an object only when nothing reachable
// points at it. those two facts are the whole relation.
//
// normally, when a function returns, its local variables become unreachable
// and the collector can free them. a closure changes that. the returned
// function still points at the outer environment, so those locals are still
// reachable. the collector sees the chain and leaves them alone:
//
//   root (a global, a timer, a listener)
//     -> the inner function
//       -> its [[Environment]]
//         -> the outer variables
//
// the outer function itself is gone. its variables are not, because the inner
// function is a root-reachable path to them.
//
// the collector does not look at whether the inner function reads a variable.
// it follows references. so one closed-over binding keeps the whole
// environment alive, including large values the inner function never uses.
//
// the memory is freed in the reverse direction. when the last reachable
// reference to the inner function goes away, the function becomes garbage.
// then nothing points at the environment, so the environment and its variables
// become garbage too. you do not free the closed-over data directly. you drop
// the closure, and the collector follows.
//
// function outer() {
//     var secret = { value: 42 };
//     return function inner() {
//         return secret.value;
//     };
// }
// var fn = outer();
// secret is still alive: fn -> environment -> secret.
// fn = null;
// fn is unreachable, so secret is unreachable, so both can be collected.