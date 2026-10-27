// callback hell is a situation where you have to nest multiple callbacks inside each other.
// it is difficult to read and debug.
// it is difficult to maintain.
// it is difficult to test.
// it is difficult to reuse.
// it is difficult to scale.
// it is difficult to maintain
// it is also called pyramid of doom



// api.createOrder(function(orderId) {
//     api.proceedToPayment(orderId, function(paymentId) {
//         api.showOrderSummary(paymentId, function(summary) {
//             api.updateWallet(summary, function(wallet) {
//                 api.showOrderSummary(wallet);
//             });
//         });
//     });
// });



