// An object stores related data as key-value pairs.

// object literal — the usual way to create an object
let user = {
    name: "Sam",
    age: 24
};
console.log(user);

// object constructor — creates an empty object, same idea as {}
let userConstruct = new Object();
console.log("obj", userConstruct);

// a property is one key and its value
console.log(user.name); // "Sam"

// dot notation reads a property when the key is a fixed, valid name
console.log(user.age); // 24

// bracket notation reads a property when the key is stored in a variable
let key = "name";
console.log(user[key]); // "Sam"

// bracket notation is also used when the key has spaces or starts with a number
let address = {
    "home city": "Pune"
};
console.log(address["home city"]); // "Pune"

// add a property by assigning a new key
user.city = "Pune";
console.log(user.city); // "Pune"

// update a property by assigning the same key again
user.age = 25;
console.log(user.age); // 25

// delete removes a property from the object
let userTwo = {
    age: 24
};
delete userTwo.age;
console.log(userTwo); // {}

// delete returns true when the property is removed or was already missing
console.log(delete userTwo.age); // true

// a missing property reads as undefined, it does not throw
console.log(userTwo.age); // undefined

// a method is a function stored as a property of the object
let person = {
    name: "Sam",
    greet: function () {
        return "Hello " + this.name;
    }
};
console.log(person.greet()); // "Hello Sam"

// this inside a method is the object before the dot at the call site
// person.greet() means this is person

// shorthand method — same method, shorter syntax
let personShort = {
    name: "Sam",
    greet() {
        return "Hello " + this.name;
    }
};
console.log(personShort.greet()); // "Hello Sam"

// property shorthand — when the variable name and the key are the same
let age = 24;
let shortUser = { age };
console.log(shortUser); // { age: 24 }

// computed property — the key is decided by an expression inside []
let field = "email";
let withComputed = {
    [field]: "sam@mail.com"
};
console.log(withComputed.email); // "sam@mail.com"

// a nested object is an object stored as the value of a property
let account = {
    name: "Sam",
    address: {
        city: "Pune",
        pin: 411001
    }
};
console.log(account.address.city); // "Pune"

// keys are stored as strings, so a number key and a string key are the same
let scores = {
    1: "one"
};
console.log(scores[1]); // "one"
console.log(scores["1"]); // "one"

// "in" is true when the object has that key
console.log("name" in user); // true
console.log("phone" in user); // false

// hasOwnProperty is true only for a key set directly on that object
console.log(user.hasOwnProperty("name")); // true
console.log(user.hasOwnProperty("phone")); // false

// for...in visits each key of the object
for (let prop in user) {
    console.log(prop, user[prop]);
}

// Object.keys returns an array of the object's own keys
console.log(Object.keys(user)); // ["name", "age", "city"]

// Object.values returns an array of the object's own values
console.log(Object.values(user)); // ["Sam", 25, "Pune"]

// Object.entries returns an array of [key, value] pairs
console.log(Object.entries(user)); // [["name", "Sam"], ["age", 25], ["city", "Pune"]]

// an empty object has no keys
let empty = {};
console.log(Object.keys(empty).length === 0); // true

// two objects with the same data are not equal, because objects are compared by reference
let a = { age: 24 };
let b = { age: 24 };
console.log(a === b); // false

// two variables that point at the same object are equal
let c = a;
console.log(a === c); // true

// changing a property through one variable is visible through the other
c.age = 30;
console.log(a.age); // 30

// a primitive (number, string, boolean) is compared by value
console.log(24 === 24); // true

// typeof of an object is "object"
console.log(typeof user); // "object"
console.log(typeof {}); // "object"

// typeof null is "object" — a long-standing language quirk, null is not an object
console.log(typeof null); // "object"
console.log(null === null); // true, this is the check to use for null

// a number is not an object
console.log(typeof 1 === "object"); // false
console.log(typeof 1 === "string"); // false

// const stops you from reassigning the variable, not from changing properties
const fixed = { age: 24 };
fixed.age = 25;
console.log(fixed.age); // 25
// fixed = {} would throw, because the binding itself cannot change

// spread copies the top-level properties into a new object
let original = { name: "Sam", age: 24 };
let copy = { ...original };
copy.age = 30;
console.log(original.age); // 24
console.log(copy.age); // 30

// Object.assign copies top-level properties from one object into another
let assigned = Object.assign({}, original);
console.log(assigned); // { name: "Sam", age: 24 }

// a nested object inside a copy is still the same object
let nested = { address: { city: "Pune" } };
let nestedCopy = { ...nested };
nestedCopy.address.city = "Mumbai";
console.log(nested.address.city); // "Mumbai"

// Object.freeze blocks adding, updating, and deleting properties
let frozen = Object.freeze({ age: 24 });
frozen.age = 30;
console.log(frozen.age); // 24
console.log(Object.isFrozen(frozen)); // true

// Object.seal blocks adding and deleting, but existing values can still change
let sealed = Object.seal({ age: 24 });
sealed.age = 30;
delete sealed.age;
console.log(sealed.age); // 30
console.log(Object.isSealed(sealed)); // true


// Symbol is a primitive type that creates a unique value, used mostly as an object key.

// Symbol() creates a new unique symbol every time, even with the same description
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false

// typeof of a symbol is "symbol"
console.log(typeof id1); // "symbol"

// a description is only a label for debugging, it does not make two symbols the same
console.log(id1.description); // "id"

// a Symbol key must be written with bracket notation, not dot notation
let userWithId = {
    name: "Sam",
    [id1]: 101
};
console.log(userWithId[id1]); // 101

// adding a Symbol property later is the same idea
userWithId[id2] = 202;
console.log(userWithId[id2]); // 202

// Symbol.for looks up or creates a shared symbol in the global registry by key
let sharedA = Symbol.for("appId");
let sharedB = Symbol.for("appId");
console.log(sharedA === sharedB); // true

// Symbol.keyFor returns the registry key of a shared symbol, or undefined for a local one
console.log(Symbol.keyFor(sharedA)); // "appId"
console.log(Symbol.keyFor(id1)); // undefined


// interview questions

// Q: What is an object in JavaScript?
// A: A collection of key-value pairs used to group related data and functions.

// Q: What is the difference between {} and new Object()?
// A: Both create a plain object; {} is the normal form and new Object() is the constructor form.

// Q: When do you use bracket notation instead of dot notation?
// A: When the key is in a variable, has a space, or is not a valid identifier.

// Q: How do you add, update, and remove a property?
// A: Assign a new key to add, assign the same key to update, and use delete to remove.

// Q: What does delete return?
// A: true when the property is removed or was not there; it does not free the whole object.

// Q: What do you get if you read a property that does not exist?
// A: undefined.

// Q: How do you check that a key exists?
// A: "key" in obj, or obj.hasOwnProperty("key") for a key set on that object itself.

// Q: What is a method?
// A: A function stored as a property of an object.

// Q: What is this inside a method?
// A: The object the method was called on, the object before the dot.

// Q: Why is { a: 1 } === { a: 1 } false?
// A: Objects are compared by reference, and each literal creates a different object.

// Q: What happens if two variables point at the same object and you change a property?
// A: Both variables see the change, because they share one object.

// Q: Can you change properties of an object declared with const?
// A: Yes. const blocks reassignment of the variable, not changes inside the object.

// Q: What is typeof of an object, an array, and null?
// A: All three are "object". null is not an object; that result is a language quirk.

// Q: How do you tell null apart from a real object?
// A: value === null, or value !== null && typeof value === "object".

// Q: How do you list keys, values, and pairs?
// A: Object.keys, Object.values, and Object.entries.

// Q: How do you check that an object is empty?
// A: Object.keys(obj).length === 0.

// Q: Are object keys numbers?
// A: A number key is stored as a string, so obj[1] and obj["1"] read the same property.

// Q: What does a spread copy of an object copy?
// A: The top-level properties. A nested object is still shared with the original.

// Q: What is the difference between Object.freeze and Object.seal?
// A: freeze blocks add, update, and delete; seal blocks add and delete but allows updates.

// Q: What is a computed property?
// A: A key written as [expression] so the key is chosen when the object is created.

// Q: What is Symbol?
// A: A primitive that creates a unique value, mainly used as a unique object key.

// Q: Are Symbol("id") and Symbol("id") the same?
// A: No. Each Symbol() call creates a new unique value; the description is only a label.

// Q: How do you read or write a Symbol property?
// A: Use bracket notation with the symbol: obj[sym]. Dot notation cannot use a Symbol key.

// Q: What is the difference between Symbol() and Symbol.for()?
// A: Symbol() is always unique; Symbol.for(key) returns the same shared symbol for that key.


// object hidden property — Symbol as a key

// A Symbol property is "hidden" because normal key listings skip it.
// Object.keys, Object.values, Object.entries, for...in, and JSON.stringify ignore Symbol keys.
// The property still exists on the object; you need the same Symbol reference to read it.

let secretKey = Symbol("secret");
let profile = {
    name: "Sam",
    age: 24,
    [secretKey]: "hidden-value"
};

console.log(profile.name); // "Sam"
console.log(profile[secretKey]); // "hidden-value"

// string-key helpers do not show the Symbol property
console.log(Object.keys(profile)); // ["name", "age"]
console.log(Object.values(profile)); // ["Sam", 24]
console.log(Object.entries(profile)); // [["name", "Sam"], ["age", 24]]

for (let prop in profile) {
    console.log(prop); // "name", then "age" — no Symbol key
}

console.log(JSON.stringify(profile)); // {"name":"Sam","age":24}

// "in" still finds a Symbol key when you pass that symbol
console.log(secretKey in profile); // true

// Object.getOwnPropertySymbols lists only the Symbol keys of the object
console.log(Object.getOwnPropertySymbols(profile)); // [Symbol(secret)]

// Reflect.ownKeys lists both string keys and Symbol keys
console.log(Reflect.ownKeys(profile)); // ["name", "age", Symbol(secret)]

// without the Symbol reference, the value stays effectively private to that object
let otherKey = Symbol("secret");
console.log(profile[otherKey]); // undefined — different symbol, even with the same description

// why use a Symbol key on an object
//   - avoid name clashes when many parts of code add properties to the same object
//   - keep a property off normal loops, Object.keys, and JSON output
//   - store meta data that callers should not treat like a normal public field

// Q: Why is a Symbol property called a hidden property?
// A: It exists on the object but is skipped by Object.keys, for...in, and JSON.stringify.

// Q: How do you list Symbol keys of an object?
// A: Object.getOwnPropertySymbols(obj), or Reflect.ownKeys(obj) for string and Symbol keys together.

// Q: Can another Symbol("secret") read the same hidden property?
// A: No. Only the exact same Symbol reference reads that property.

