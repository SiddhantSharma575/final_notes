// settimeout has trust issues

// if global execution context is running, settimeout will be executed once the global execution context is finished

console.log("start");

setTimeout(() => {
    console.log("timeout");
}, 0);

console.log("end");

// output:
// start
// end
// timeout

let startDate = new Date();
let endDate = startDate.getTime() + 1000;

while (new Date().getTime() < endDate) {
    console.log("waiting for 1 second");
}

console.log("end");

// output:
// start
// end
// waiting for 1 second