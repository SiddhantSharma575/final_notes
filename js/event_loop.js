// Event loop notes. The full walkthrough is in event_loop.md.
// Run one example at a time. Comment the others back out before you reload.
// In index.html, set the script to: <script src="event_loop.js"></script>


// ---------------------------------------------------------------------------
// Call stack
// The last function called is the first one that must return.
// While multiply is running, the stack is: multiply -> square -> printSquare
// ---------------------------------------------------------------------------

function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  const result = square(n);
  console.log(result);
}

printSquare(4); // 16


// ---------------------------------------------------------------------------
// Example 1 — setTimeout is a Web API. The callback waits in the callback queue
// until the call stack is empty.
// Output: start, end, callback
// ---------------------------------------------------------------------------

console.log("start");

setTimeout(function cb() {
  console.log("callback");
}, 0);

console.log("end");


// ---------------------------------------------------------------------------
// Example 2 — a busy stack delays a timer that already finished.
// The callback is queued at 0 ms, but it cannot run during the loop.
// Output, after about 2 seconds: start, end, timer
// ---------------------------------------------------------------------------

// console.log("start");
//
// setTimeout(() => {
//   console.log("timer");
// }, 0);
//
// const started = Date.now();
// while (Date.now() - started < 2000) {}
//
// console.log("end");


// ---------------------------------------------------------------------------
// Example 3 — promise callbacks are microtasks. They run before the callback queue.
// Output: 1, 2, promise, timeout
// ---------------------------------------------------------------------------

// console.log("1");
//
// setTimeout(() => {
//   console.log("timeout");
// }, 0);
//
// Promise.resolve().then(() => {
//   console.log("promise");
// });
//
// console.log("2");


// ---------------------------------------------------------------------------
// Example 4 — a task can schedule a microtask, and a microtask can schedule a task.
// Output:
//   start
//   end
//   promise 1
//   timeout 1
//   promise inside timeout
//   timeout inside promise
// ---------------------------------------------------------------------------

// console.log("start");
//
// setTimeout(() => {
//   console.log("timeout 1");
//   Promise.resolve().then(() => {
//     console.log("promise inside timeout");
//   });
// }, 0);
//
// Promise.resolve().then(() => {
//   console.log("promise 1");
//   setTimeout(() => {
//     console.log("timeout inside promise");
//   }, 0);
// });
//
// console.log("end");


// ---------------------------------------------------------------------------
// Example 5 — a click listener is registered with the DOM Web API.
// It runs later, from the callback queue, when the button is clicked.
// index.html already has <button id="btn">Click me</button>
// ---------------------------------------------------------------------------

// console.log("script start");
//
// document.getElementById("btn").addEventListener("click", function onClick() {
//   console.log("click handler");
//
//   Promise.resolve().then(() => {
//     console.log("promise from click");
//   });
//
//   setTimeout(() => {
//     console.log("timeout from click");
//   }, 0);
// });
//
// console.log("script end");
