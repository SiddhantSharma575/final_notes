# The JavaScript Event Loop

JavaScript runs one thing at a time. There is a single call stack, so a function cannot start until the function already on the stack returns. The event loop is how the browser still does timers, clicks, and network requests without a second JavaScript thread.

The pieces below are the browser model (Chrome, Firefox, and the others). The JavaScript engine itself only runs the code that is currently on the call stack. Everything async is handed to the browser, then brought back later.

```
                    ┌─────────────────────┐
                    │     Call stack      │  runs JS, one frame at a time
                    └──────────▲──────────┘
                               │  push a callback only when the stack is empty
                    ┌──────────┴──────────┐
                    │     Event loop      │
                    └──────────▲──────────┘
                               │
              microtasks first │  then one callback (macrotask)
         ┌─────────────────────┴─────────────────────┐
         │                                           │
┌────────┴────────┐                        ┌─────────┴─────────┐
│ Microtask queue │                        │  Callback queue   │
│ promises,       │                        │  timers, clicks,  │
│ queueMicrotask  │                        │  other Web API    │
└────────▲────────┘                        │  callbacks        │
         │                                 └─────────▲─────────┘
         │                                           │
         │              timer done / click / response│
         │                                 ┌─────────┴─────────┐
         └─────────────────────────────────│     Web APIs      │
                   promise already settled │  setTimeout, DOM, │
                                           │  fetch, ...       │
                                           └───────────────────┘
```

## Call stack

The call stack is a list of function calls that are in progress. The last function that was called is the first one that must finish. That order is called LIFO: last in, first out.

When JavaScript calls a function, it pushes a frame onto the stack. The frame holds that call: which function it is, its local variables, and where to continue after it returns. When the function returns, the frame is popped.

```js
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

printSquare(4);
```

While `multiply` is running, the stack looks like this, top to bottom:

```
multiply(4, 4)     ← running now
square(4)
printSquare(4)
```

`multiply` returns `16` and is popped. `square` returns `16` and is popped. `printSquare` logs `16` and is popped. The stack is empty again.

If functions keep calling themselves and never return, the stack grows until the engine throws `RangeError: Maximum call stack size exceeded`.

```js
function recurse() {
  recurse();
}
recurse();
```

A long synchronous loop also occupies the stack the whole time. Timers and clicks cannot run until that work returns. The page feels frozen because painting and event handlers share this one stack.

## Web APIs

`setTimeout`, DOM events, and `fetch` are not part of the JavaScript language. The browser provides them. They are often called Web APIs (or browser APIs).

When your code calls one of them, the call itself is short. It registers work with the browser and returns. The waiting happens outside the call stack.

| Web API | What the browser does | Where the callback goes when it is ready |
|---|---|---|
| `setTimeout` / `setInterval` | Starts a timer | Callback queue |
| DOM events (`click`, `keydown`, …) | Waits for the user | Callback queue |
| `fetch` / `XMLHttpRequest` | Performs the network request | The promise's `.then` goes to the microtask queue |
| `queueMicrotask` | Schedules a function to run after the current stack | Microtask queue |
| `Promise` callbacks (`.then`, `.catch`, `.finally`) | Run after the promise settles | Microtask queue |

`setTimeout(fn, 1000)` does not pause JavaScript for one second. It asks the browser: "after at least 1000 ms, put `fn` on the callback queue." The number is a minimum delay, not a guarantee. `fn` still has to wait until the call stack is empty and every microtask ahead of it has run.

`setTimeout(fn, 0)` means "run this as soon as you can after the current script," not "run this instantly." Zero still goes through the Web API and the callback queue.

## Callback queue

The callback queue (also called the task queue or macrotask queue) is a waiting line for callbacks that came from Web APIs such as timers and DOM events. It is FIFO: first in, first out. The oldest callback is the next one taken.

A callback sits in this queue. It does not run there. It runs only after the event loop moves it onto the call stack.

Two timers started in order:

```js
setTimeout(() => console.log("first timer"), 0);
setTimeout(() => console.log("second timer"), 0);
```

Both timers finish almost together. `first timer` was queued first, so it runs first.

A click works the same way. The browser notices the click, puts your listener on the callback queue, and the listener runs when the stack is free.

```js
document.getElementById("btn").addEventListener("click", () => {
  console.log("clicked");
});
```

If a long loop is running when you click, the listener stays in the queue until the loop finishes.

## Microtask queue

Promises do not use the callback queue. When a promise settles, its `.then` / `.catch` / `.finally` callbacks go to the microtask queue. `queueMicrotask(fn)` puts `fn` there directly.

The event loop empties the microtask queue completely before it takes the next item from the callback queue. One promise callback that schedules another promise callback will run before any waiting `setTimeout`.

```js
setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));
```

`promise` prints before `timeout`, even though the timer delay is `0`.

## What the event loop does

The event loop is a continuous check with a fixed order:

1. Run the current JavaScript until the call stack is empty. A normal script is one task.
2. Run every microtask currently queued. If a microtask queues another microtask, run that too, until the microtask queue is empty.
3. The browser may paint (update what you see on screen).
4. Take the oldest callback from the callback queue and push it onto the call stack.
5. Repeat from step 2.

A callback is never pulled onto the stack while another function is still running. That is why JavaScript stays single-threaded even though timers and network requests overlap in the browser.

## Example 1: timer waits for synchronous code

```js
console.log("start");

setTimeout(function cb() {
  console.log("callback");
}, 0);

console.log("end");
```

Output:

```
start
end
callback
```

Step by step:

1. `console.log("start")` is pushed, prints `start`, and is popped.
2. `setTimeout` is pushed. The browser starts a timer and stores `cb`. `setTimeout` returns immediately and is popped. `cb` is not on the stack.
3. `console.log("end")` prints `end` and is popped. The stack is empty.
4. The timer (0 ms) has already expired, so the browser moves `cb` to the callback queue.
5. The event loop sees an empty stack and an empty microtask queue, so it pushes `cb`.
6. `cb` prints `callback` and is popped.

The same sequence with a delay of `1000` is identical, except step 4 happens about a second later. During that second the stack is empty and the page can handle other work.

## Example 2: a blocked stack delays the timer

```js
console.log("start");

setTimeout(() => {
  console.log("timer");
}, 0);

const started = Date.now();
while (Date.now() - started < 2000) {
  // stays on the stack for about 2 seconds
}

console.log("end");
```

Output, after about two seconds:

```
start
end
timer
```

The timer reached 0 ms immediately, and `timer`'s callback was queued. It could not run during the `while` loop, because that loop still owned the call stack. `end` prints only when the loop finishes. Then the stack is empty and the queued callback runs.

This is why heavy synchronous work makes clicks, timers, and animations late.

## Example 3: promises run before timers

```js
console.log("1");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("2");
```

Output:

```
1
2
promise
timeout
```

1. `1` prints. The stack frame is popped.
2. `setTimeout` registers a timer with the Web API and returns. Nothing is queued yet, or the callback is queued as soon as the 0 ms timer expires. Either way it is a callback-queue item, and it waits.
3. `Promise.resolve()` is already fulfilled, so the `.then` callback is placed on the microtask queue. The `.then` call itself returns immediately.
4. `2` prints. The script task is over. The stack is empty.
5. The event loop drains microtasks. `promise` prints.
6. The microtask queue is empty, so the event loop takes the timer callback. `timeout` prints.

## Example 4: callbacks that schedule more work

```js
console.log("start");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => {
    console.log("promise inside timeout");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => {
    console.log("timeout inside promise");
  }, 0);
});

console.log("end");
```

Output:

```
start
end
promise 1
timeout 1
promise inside timeout
timeout inside promise
```

What is queued during the script:

- Callback queue: `timeout 1`
- Microtask queue: `promise 1`

After `end`, the stack is empty.

1. Drain microtasks. `promise 1` runs. It prints, then registers `timeout inside promise` with the Web API. That new timer callback joins the callback queue behind `timeout 1`.
2. Microtasks are empty. Take the oldest callback: `timeout 1`. It prints, then queues `promise inside timeout` as a microtask.
3. Before the next timer, drain microtasks. `promise inside timeout` prints.
4. Take the next callback: `timeout inside promise` prints.

A microtask scheduled by a macrotask runs before the following macrotask. A macrotask scheduled by a microtask waits until the microtask queue is clear.

## Example 5: a click is also a callback

`index.html` has a button with `id="btn"`.

```js
console.log("script start");

document.getElementById("btn").addEventListener("click", function onClick() {
  console.log("click handler");
});

console.log("script end");
```

Loading the page prints:

```
script start
script end
```

`addEventListener` only registers `onClick` with the DOM Web API. The function is not called during the script.

When you click the button:

1. The browser places `onClick` on the callback queue.
2. If the stack is empty and there are no microtasks, the event loop pushes `onClick`.
3. The handler prints `click handler` and returns.

If the handler itself starts a promise and a timer, those follow the same rules as the examples above. The click handler is just another task.

## Order to remember

For one turn of the event loop, after the stack empties:

1. All microtasks (promise callbacks, `queueMicrotask`)
2. Optional browser render
3. One callback-queue task (`setTimeout`, `setInterval`, DOM events)

Then microtasks again, and so on.

Synchronous code always finishes before either queue. Between a promise and a timer registered in the same turn, the promise callback runs first.

Runnable copies of these examples are in `event_loop.js`. Point the script tag in `index.html` at that file, open the page, and read the console.
