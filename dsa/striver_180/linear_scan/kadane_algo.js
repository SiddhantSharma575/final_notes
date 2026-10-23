// Given an integer array nums, find the subarray with the largest sum and return the sum of the elements present in that subarray.

// A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:
// Input: nums = [2, 3, 5, -2, 7, -4]

// Output: 15

// Explanation:

// The subarray from index 0 to index 4 has the largest sum = 15

// Example 2:
// Input: nums = [-2, -3, -7, -2, -10, -4]

// Output: -2

// Explanation:

// The element on index 0 or index 3 make up the largest sum when taken as a subarray


// const nums = [2, 3, 5, -2, 7, -4];
const nums = [-2, -3, -7, -2, -10, -4];
// const nums = [-1, 2, 3, -1, 2, -6, 5]

// let maxi = -Infinity
// // brute
// for(let i=0; i<nums.length; i++) {
    
//     for(let j=i; j<nums.length; j++) {
//         let sum = 0;

//         for(let k=i; k<=j; k++){
//             sum += nums[k];
//         }

//         maxi = Math.max(maxi,sum)
//     }
// }

// console.log("maxi", maxi)


// better

// let maxi = -Infinity;

// for(let i=0; i<nums.length; i++) {
//     let sum = 0;
//     for(let j=i; j<nums.length; j++) {
//         sum += nums[j];
//         maxi = Math.max(sum,maxi);
//     }
// }

// console.log("max", maxi)


// optimal kadane 

let maxi = -Infinity;
let sum = 0;
for(let i=0; i<nums.length; i++) {
    sum += nums[i];

    if(sum > maxi) {
        maxi = sum;
    }

    if(sum < 0) {
        sum = 0;
    }
}

console.log("max", maxi)