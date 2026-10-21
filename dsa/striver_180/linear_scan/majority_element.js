// Given an integer array nums of size n, return the majority element of the array.

// The majority element of an array is an element that appears more than n/2 times in the array. The array is guaranteed to have a majority element.

// Example 1:
// Input: nums = [7, 0, 0, 1, 7, 7, 2, 7, 7]

// Output: 7

// Explanation:

// The number 7 appears 5 times in the 9 sized array

// Example 2:
// Input: nums = [1, 1, 1, 2, 1, 2]

// Output: 1

// Explanation:

// The number 1 appears 4 times in the 6 sized array

// brute force 
// time limite exceeded  
 
let nums =  [7, 0, 0, 1, 7, 7, 2, 7, 7];
// let nums  = [1, 1, 1, 2, 1, 2]
// let nums = [-1, -1, -1, -1]
let majoryElement = null;

for(let i=0; i<nums.length; i++) {
    let curr = nums[i];
    let count = 0
    for(let j=i; j<nums.length; j++) {
       if(nums[j] === curr) {
          count++;
       }
    }
    
    if(count > nums.length / 2) {
        majoryElement = curr; 
    }
}

console.log(majoryElement);

// with map
let majority_map = new Map();

for(let i=0; i<nums.length; i++) {
    if(majority_map.has(nums[i])) {
        let curr = majority_map.get(nums[i]);
        majority_map.set(nums[i], curr + 1)
    } else {
        majority_map.set(nums[i], 1)
    }
}

// console.log(majority_map) 

majority_map.forEach((value,key) => value > nums.length/2 ? console.log(key) : null )
