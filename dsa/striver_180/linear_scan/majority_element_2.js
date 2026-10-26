// Given an integer array nums of size n. Return all elements which appear more than n/3 times in the array. The output can be returned in any order.

// Example 1:
// Input: nums = [1, 2, 1, 1, 3, 2]

// Output: [1]

// Explanation:

// Here, n / 3 = 6 / 3 = 2.

// Therefore the elements appearing 3 or more times is : [1]

// Example 2:
// Input: nums = [1, 2, 1, 1, 3, 2, 2]

// Output: [1, 2]

// Explanation:

// Here, n / 3 = 7 / 3 = 2.

// Therefore the elements appearing 3 or more times is : [1, 2]


// brute force

// const nums = [1, 2, 1, 1, 3, 2];
// const nums = [1, 2, 1, 1, 3, 2, 2];
const nums = [1, 2, 1, 1, 3, 2, 2, 3]

// let ans = [];

// for (let i = 0; i < nums.length; i++) {
//     if (ans.length === 0 || ans[0] !== nums[i]) {
//         let count = 0;
//         for (let j = i; j < nums.length; j++) {
//             if (nums[i] === nums[j]) {
//                 count++;
//             }
//         }
//         if (count > Math.floor(nums.length / 3)) {
//             ans.push(nums[i]);
//         }
//     }
//     if (ans.length === 2) {
//         break;
//     }
// }


// let result = [];
 
// // Declaring a map
// let mpp = new Map();

// // Least occurrence of the majority element
// let mini = Math.floor(n / 3) + 1;

// // Storing the elements with its occurrence
// for (let i = 0; i < n; i++) {
//     let num = nums[i];
//     if (!mpp.has(num)) {
//         mpp.set(num, 0);
//     }
//     mpp.set(num, mpp.get(num) + 1);

//     // Checking if num is the majority element
//     if (mpp.get(num) === mini) {
//         result.push(num);
//     }

//     // If result size is equal to 2 break out of loop
//     if (result.length === 2) {
//         break;
//     }
// }


// console.log(ans);



// best


