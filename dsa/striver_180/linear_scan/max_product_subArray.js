// Given an integer array nums. Find the subarray with the largest product, and return the product of the elements present in that subarray.

// A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:
// Input: nums = [4, 5, 3, 7, 1, 2]

// Output: 840

// Explanation:

// The largest product is given by the whole array itself

// Example 2:
// Input: nums = [-5, 0, -2]

// Output: 0

// Explanation:

// The largest product is achieved with the following subarrays [0], [-5, 0], [0, -2], [-5, 0, -2].


// const nums = [4, 5, 3, 7, 1, 2]
const nums = [-5, 0, -2]

let maxP = nums[0];

for (let i = 0; i < nums.length; i++) {
    let currp = nums[i]
    for (let j = i + 1; j < nums.length; j++) {
        maxP = Math.max(currp, maxP);
        currp = currp * nums[j];
    }

    maxP = Math.max(currp, maxP)
}

console.log(maxP);


function maxProduct(nums) {
    let n = nums.length;
    
    let ans = Number.MIN_SAFE_INTEGER; // to store the answer
    
    // Indices to store the prefix and suffix multiplication
    let prefix = 1, suffix = 1;
    
    // Iterate on the elements of the given array
    for (let i = 0; i < n; i++) {
        
        /* Resetting the prefix and suffix
        multiplication if they turn out to be zero */
        if (prefix === 0) prefix = 1;
        if (suffix === 0) suffix = 1;
        
        // update the prefix and suffix multiplication
        prefix *= nums[i];
        suffix *= nums[n - i - 1];
        
        // store the maximum as the answer
        ans = Math.max(ans, prefix, suffix);
    }
    
    // return the result
    if(ans === -0) return 0;
    return ans;
}
