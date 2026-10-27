// promises are a way to handle asynchronous operations in javascript.
// they are a way to handle asynchronous operations in javascript.

// const cart = ["shoes", "pants", "kurta"];

// function createOrder(cart) {
//     return new Promise((resolve, reject) => {
//         if (cart.length === 0) {
//             reject("Cart is empty");
//         }
//         const orderId = "order_" + Date.now();
//         resolve(orderId);
//     });
// }

// createOrder(cart).then((order) => {
//     console.log(order);
// }).catch((error) => {
//     console.log(error);
// });

// // promise chaining is a way to chain multiple promises together.
// // each .then() returns a new promise, so the next step waits for the previous one.
// // real world: checkout flow — create order, pay, show summary, update wallet.

// function proceedToPayment(orderId) {
//     return new Promise((resolve, reject) => {
//         if (!orderId) {
//             reject("Payment failed: no order id");
//         }
//         resolve({ paymentId: "pay_123", orderId, amount: 2500 });
//     });
// }

// function showOrderSummary(paymentInfo) {
//     return new Promise((resolve) => {
//         resolve({
//             orderId: paymentInfo.orderId,
//             paymentId: paymentInfo.paymentId,
//             amount: paymentInfo.amount,
//             items: cart,
//             status: "paid",
//         });
//     });
// }

// function updateWallet(summary) {
//     return new Promise((resolve) => {
//         const cashback = summary.amount * 0.05;
//         resolve({ balance: 500 + cashback, cashback, summary });
//     });
// }

// createOrder(cart)
//     .then((orderId) => {
//         console.log("1. order:", orderId);
//         return proceedToPayment(orderId);
//     })
//     .then((paymentInfo) => {
//         console.log("2. payment:", paymentInfo);
//         return showOrderSummary(paymentInfo);
//     })
//     .then((summary) => {
//         console.log("3. summary:", summary);
//         return updateWallet(summary);
//     })
//     .then((wallet) => {
//         console.log("4. wallet:", wallet);
//     })
//     .catch((error) => {
//         console.log("checkout failed:", error);
//     });




// promise.all is a way to wait for all promises to resolve.
//   -- array of promises
//   -- returns an array of results
//   -- if any of the promises reject, the entire promise.all rejects
//   -- if all the promises resolve, the entire promise.all resolves
// suppose  1s, 2s, 3s time took by all the promises, then the entire promise.all will take 3s to resolve.
// it takes 1s in case of reject if first promise rejects.

// promise.allSettled is a way to wait for all promises to settle.
//   -- array of promises
//   -- it waits for all the promises to settle, whether they resolve or reject.
//   -- return array of results in promises based on the result of the promises 

// promise.race is a way to wait for the first promise to settle.
//   -- array of promises
//   -- it waits for the first promise to settle, whether it resolves or rejects.
//   -- return the result of the first promise to settle.
//  let says 1s, 2s, 3s time took by all the promises, then the entire promise.race will take 1s to resolve.
// in case of reject, it will return the result of the first promise to reject. 
// let say 1s,2s,3s time took by all the promises, and 2s time took by the second promise to reject, then the entire promise.race will take 1s to resolve.
// promise.race is used to wait for the first promise to settle, whether it resolves or rejects.



// promise.any is a way to wait for the first promise to resolve.
//   -- array of promises
//   -- it waits for the first promise to resolve, whether it rejects or not.
//   -- return the result of the first promise to resolve.
//  let says 1s, 2s, 3s time took by all the promises, then the entire promise.any will take 1s to resolve.
// in case of resolve, it will return the result of the first promise to resolve.
// let say 1s,2s,3s time took by all the promises, and 2s time took by the second promise to resolve, then the entire promise.any will take 1s to resolve.
// promise.any is used to wait for the first promise to resolve, whether it rejects or not.
// it will wait for first success
// if everything fails, return result is an array of all the errors of promises 

