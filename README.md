# JexLang

JexLang is a lightweight expression language designed for embedding expressions and simple logic in applications.

## Why JexLang?

JexLang addresses the common need for runtime-evaluated expressions and formulas in modern applications. Instead of hardcoding business logic, JexLang enables dynamic expressions that can be stored, modified, and evaluated without redeployment.

### Key Use Cases

#### Form and Field Logic
- **Field Validation Rules**: Define complex validation rules that can be evaluated client-side or server-side
- **Conditional Field Visibility**: Show or hide fields based on values of other fields
- **Cross-Field Dependencies**: Auto-populate or modify fields based on changes to related fields
- **Custom Error Messages**: Generate dynamic error messages based on field values

#### Business Rules Engine
- **Quote Calculations**: Implement configurable pricing and quoting formulas that business users can update
- **Eligibility Rules**: Define complex criteria for product eligibility, discounts, or service tiers
- **Approval Workflows**: Create conditional approval paths based on dynamic business criteria
- **Rating Engines**: Build insurance or credit scoring systems with modifiable calculation logic

#### Configuration-Driven Features
- **Feature Flags with Conditions**: Enable features based on complex user attributes or environmental factors
- **A/B Test Rules**: Define sophisticated test segmentation without code changes
- **Personalization Logic**: Tailor content based on user behavior using configurable rules

#### Cross-Platform Consistency
- **Shared Validation Logic**: Use the same rules across web, mobile, and backend systems
- **Platform-Agnostic Rules**: Write once, run in JavaScript, Java, and other supported languages
- **Consistent Calculation Results**: Ensure identical outputs across different environments

### Advantages Over Alternatives

- **Security**: Safer than eval()-based solutions, with controlled execution environments
- **Performance**: Lightweight parser and interpreter optimized for frequent evaluations
- **Type Safety**: Optional type checking for expressions to catch errors early
- **Readability**: Syntax familiar to developers and approachable to technical business users
- **Extensibility**: Easy to add custom functions and operators for domain-specific needs
- **Cross-Platform**: Same expressions work across frontend, backend, and mobile environments

## Language Documentation

### Basic Syntax

#### Variable Declaration

```js
// Using let (mutable)
let x = 10;
let name = "John";

// Using const (immutable)
const PI = 3.14159;

// Global variables
global let counter = 0;
```

#### Constants

Constants in JexLang are immutable variables that cannot be reassigned or redeclared:

```js
// Declare a constant
const PI = 3.14159;

// Error: Cannot reassign a constant
PI = 3.0;     // Runtime error: "Variable 'PI' is a constant and cannot be re-declared or modified"

// Error: Cannot redeclare a constant
const PI = 3; // Runtime error: "Cannot redeclare constant 'PI'"

// Error: Cannot convert a constant to a mutable variable
let PI = 3;   // Runtime error: "Cannot redeclare constant 'PI'"

// Constants are block-scoped
if (true) {
  const local = 100;  // Only available inside this block
}
// local is not available here
```

#### Scope Rules

JexLang has three types of variable scope:

- **Block scope**: Variables are only accessible within their containing block `{...}`
- **Program scope**: Variables declared at the program level are accessible throughout the program
- **Global scope**: Variables declared with `global` keyword are accessible across multiple evaluations

### Data Types

```js
// Numbers
let integer = 42;
let decimal = 3.14;
let scientific = 1.2e3;  // 1200

// Strings
let singleQuoted = 'Hello';
let doubleQuoted = "World";

// Booleans
let isTrue = true;
let isFalse = false;

// Null
let empty = null;

// Arrays
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "two", true, null];

// Objects
let person = {
  name: "Jane",
  age: 25,
  address: {
    city: "New York",
    zip: 10001
  }
};
```

## Operators

### Arithmetic Operators

```js
// Basic arithmetic
let sum = 5 + 3;        // 8
let difference = 10 - 4; // 6
let product = 3 * 4;     // 12
let quotient = 10 / 2;   // 5
let remainder = 10 % 3;  // 1

// Exponentiation
let squared = 3 ** 2;    // 9
let cubed = 2 ^ 3;       // 8

// Square root
let sqrtValue = √25;     // 5
let sqrtValue2 = sqrt(25); // 5

// Increment/Decrement
let a = 5;
a++;                    // 6
let b = 10;
--b;                    // 9
```

### Comparison Operators

```js
let x = 5;
let y = 10;

x == 5;                // true
x != y;                // true
x < y;                 // true
y > x;                 // true
x <= 5;                // true
y >= 10;               // true
```

### Logical Operators

```js
// Using && or 'and'
(x > 0) && (y < 20);   // true
(x > 0) and (y < 20);  // true

// Using || or 'or'
(x > 10) || (y > 5);   // true
(x > 10) or (y > 5);   // true
```

### Assignment

```js
let x = 5;

// Object property assignment
person.age = 26;
person["name"] = "Jane Doe";

// Array element assignment
numbers[0] = 99;  // Modify first element

// Note: Assignments to out-of-bounds indexes don't throw errors
// but won't modify the array
numbers[100] = 5;  // No effect if array length < 100

// To add elements to the end of an array, use push instead
push(numbers, 10, 20, 30);
```

## Control Structures

### Conditional Statements

```js
if (x > 10) {
  // Code to execute if x > 10
}

if (y < 5) {
  // Code to execute if y < 5
} else {
  // Code to execute otherwise
}

if (x == 1) {
  // Code for x == 1
} else if (x == 2) {
  // Code for x == 2
} else {
  // Default code
}
```

### Loops

JexLang provides a versatile `repeat` loop that can iterate over different types of values:

```js
// Repeat a specified number of times
repeat(5) {
  // Code to repeat 5 times
  // $index contains the current iteration (0 to 4)
  // $it contains the same value as $index
}

// Repeat over array elements
let fruits = ["apple", "banana", "cherry"];
repeat(fruits) {
  // Code executed for each element
  // $index contains the current index (0 to 2)
  // $it contains the current element ("apple", "banana", "cherry")
}

// Repeat over object properties
let person = { name: "John", age: 30, city: "New York" };
repeat(person) {
  // Code executed for each property
  // $key contains the property name ("name", "age", "city")
  // $value contains the property value ("John", 30, "New York")
  // $it contains the same as $value
}

// Repeat over string characters
let text = "Hello";
repeat(text) {
  // Code executed for each character
  // $index contains the character position (0 to 4)
  // $it contains the current character ("H", "e", "l", "l", "o")
}
```

#### Loop Variables

During each iteration, JexLang automatically defines special variables:

| Variable | Description |
|----------|-------------|
| `$index` | Current iteration index (0-based) for arrays, strings, and numeric loops |
| `$it`    | Current item being processed (array element, object value, string character, or numeric index) |
| `$key`   | Property name (only available when iterating over objects) |
| `$value` | Property value (only available when iterating over objects, same as `$it`) |

#### Examples

```js
// Sum numbers in an array
let numbers = [1, 2, 3, 4, 5];
let sum = 0;
repeat(numbers) {
  sum = sum + $it;
}
// sum is now 15

// Build a formatted string from object properties
let data = { name: "Alice", age: 28, country: "Canada" };
let result = "";
repeat(data) {
  result = result + $key + ": " + $value + "\n";
}
// result is "name: Alice\nage: 28\ncountry: Canada\n"

// Count occurrences of a character
let message = "hello world";
let countL = 0;
repeat(message) {
  if ($it == "l") {
    countL = countL + 1;
  }
}
// countL is 3
```

## Advanced Features

### Ternary Operator

```js
// Standard ternary
let result = x > 5 ? "Greater" : "Less or equal";

// Short ternary (Elvis operator)
let defaultName = userName ?: "Guest";
```

### Member Access

```js
// Dot notation
let city = person.address.city;

// Bracket notation
let age = person["age"];

// Handle possible null values with ternary
let zipCode = person.address ? person.address.zip : null;
let firstItem = array.length > 0 ? array[0] : null;
```

### Function Calls

```js
// Simple function call
let result = calculate(10, 20);

// Function with object argument
validatePerson({name: "John", age: 30});
```

### Pipe Operator (Transforms)

```js
// Transform a value through a function
let upperName = "john" | toUpperCase;  // "JOHN"

// Chain transformations
let result = 5 | double | increment;  // Equivalent to increment(double(5))
```

## Truthy and Falsy Values

In JexLang, values are automatically converted to booleans in conditional contexts (like `if` statements, ternary operators, and logical operators). Understanding which values are considered "truthy" and which are "falsy" is important for writing correct expressions.

### Falsy Values

The following values are considered **falsy** (evaluate to `false` in conditional contexts):

- `false`
- `0` (zero)
- `""` (empty string)
- `null`
- `undefined`
- `[]` (empty array)
- `{}` (empty object)
- `NaN`

### Truthy Values

All other values are considered **truthy** (evaluate to `true` in conditional contexts):

- `true`
- Any non-zero number (both positive and negative)
- Any non-empty string
- Any array with elements
- Any object with properties
- Function references

### Examples

```js
// Falsy examples
if (0) { /* Not executed */ }
if ("") { /* Not executed */ }
if (null) { /* Not executed */ }
if ([]) { /* Not executed */ }
if ({}) { /* Not executed */ }

// Truthy examples
if (1) { /* Executed */ }
if (-1) { /* Executed */ }
if ("hello") { /* Executed */ }
if ([1, 2, 3]) { /* Executed */ }
if ({ name: "John" }) { /* Executed */ }

// Common patterns
let username = "";
let defaultName = username ? username : "Guest";  // "Guest"
let displayName = username || "Guest";  // "Guest"

let count = 5;
let message = count ? "Items: " + count : "No items";  // "Items: 5"
```

### Boolean Conversion

You can explicitly convert values to booleans using the `boolean()` function:

```js
boolean(0);       // false
boolean("");      // false
boolean(null);    // false
boolean([]);      // false
boolean({});      // false
boolean("0");     // true (non-empty string)
boolean(42);      // true
boolean("false"); // true (non-empty string)
```

## Global Variables

JexLang provides several built-in global variables that are available by default in any expression:

| Variable | Description | Value |
|----------|-------------|-------|
| `PI` | Mathematical constant pi | 3.141592653589793 |
| `E` | Mathematical constant e | 2.718281828459045 |
| `LN2` | Natural logarithm of 2 | 0.6931471805599453 |
| `LN10` | Natural logarithm of 10 | 2.302585092994046 |
| `LOG2E` | Base-2 logarithm of e | 1.4426950408889634 |
| `LOG10E` | Base-10 logarithm of e | 0.4342944819032518 |
| `SQRT1_2` | Square root of 1/2 | 0.7071067811865476 |
| `SQRT2` | Square root of 2 | 1.4142135623730951 |
| `VERSION` | JexLang version | Current version string |
| `__CLIENT_LANGUAGE` | Implementation language | "javascript", "java"

These constants can be used directly in expressions:

```js
// Calculate area of a circle
let radius = 5;
let area = PI * radius * radius;  // 78.53981633974483

// Use mathematical constants
let value = E * 2;  // 5.436563656918090
```

## Built-in Functions

JexLang provides a rich set of built-in functions that can be called directly in your expressions:

### Mathematical Functions

```js
// Basic math operations
abs(-5);             // 5
ceil(4.2);           // 5
clamp(15, 0, 10);    // 10 (value constrained between min and max)
floor(4.8);          // 4
lerp(0, 10, 0.5);    // 5 (linear interpolation)
max(3, 7, 2);        // 7
min(3, 7, 2);        // 2
pow(2, 3);           // 8
random();            // Random number between 0 and 1
round(4.5);          // 5
sign(-5);            // -1
sqrt(25);            // 5
trunc(4.9);          // 4

// Trigonometric functions
acos(1);             // 0
asin(0);             // 0
atan(1);             // ~0.785
atan2(1, 1);         // ~0.785 (arctangent of y/x)
cos(0);              // 1
deg(Math.PI);        // 180 (radians to degrees)
rad(180);            // 3.14... (degrees to radians)
sin(Math.PI/2);      // 1
tan(Math.PI/4);      // ~1

// Exponential and logarithmic
cbrt(27);            // 3
exp(1);              // 2.718... (e^1)
log(Math.E);         // 1 (natural logarithm)
log10(100);          // 2 (base-10 logarithm)
log2(8);             // 3 (base-2 logarithm)

// Hyperbolic functions
acosh(1);            // 0
asinh(0);            // 0
atanh(0);            // 0
cosh(1);             // ~1.543
sinh(1);             // ~1.175
tanh(1);             // ~0.762
```

### Type Conversion Functions

```js
boolean(1);          // true
double("1e3");       // 1000
float("42.9");       // 42.9
int("42.9");         // 42
number("42");        // 42
string(42);          // "42"
```

### String Functions

```js
capitalize("hello world");  // "Hello World"
length("hello");     // 5
lower("HELLO");      // "hello"
trim("  hello  ");   // "hello"
upper("hello");      // "HELLO"
```

### Array Functions

```js
// Creating and accessing arrays
array(1, 2, 3);      // [1, 2, 3]
first([1, 2, 3]);    // 1
last([1, 2, 3]);     // 3

// Modifying arrays
push(arr, 3, 4);     // [1, 2, 3, 4]
pop(arr);            // 4 (arr is now [1, 2, 3])

// Calculations with arrays
avg([1, 2, 3, 4]);   // 2.5
sum([1, 2, 3, 4]);   // 10
```

### Date and Time Functions

```js
// Current date/time
date();              // Current timestamp
date(1654022400000); // Convert timestamp to standardized date value
now();               // Current timestamp in milliseconds
timestamp();         // Current timestamp in seconds (Unix timestamp)
today();             // Timestamp at midnight today

// Date components
day();               // Current day of month
hour();              // Current hour
minute();            // Current minute
month();             // Current month (1-12)
second();            // Current second
weekday();           // Current day of week (0-6, 0 is Sunday)
year();              // Current year

// Date arithmetic
addDays(today(), 5);       // Date 5 days from today
addHours(date(), 3);       // Date 3 hours from now
addMinutes(date(), 30);    // Date 30 minutes from now
addMonths(today(), 1);     // Date 1 month from today
addYears(today(), 1);      // Date 1 year from today
daysBetween(today(), addDays(today(), 10)); // 10

// Date utilities
isLeapYear(2024);    // true
```

## Built-in Transforms

Transforms can be applied using the pipe operator (`|`) to modify values:

### String Transforms

```js
"hello world" | upper;          // "HELLO WORLD"
"HELLO WORLD" | lower;          // "hello world"
"hello world" | capitalize;     // "Hello World"
"  hello  " | trim;             // "hello"
```

### Numeric Transforms

```js
-5 | abs;                       // 5
4.8 | floor;                    // 4
4.2 | ceil;                     // 5
4.5 | round;                    // 5
```

### Type Transforms

```js
"42" | number;                  // 42
42 | string;                    // "42"
1 | boolean;                    // true
"42.9" | int;                   // 42
"42.9" | float;                 // 42.9
```

### Measurement Transforms

```js
"hello" | length;               // 5
[1, 2, 3] | length;             // 3
{a: 1, b: 2} | length;          // 2
```

### Chain Transforms

```js
// You can chain multiple transforms
"  hello world  " | trim | capitalize;            // "Hello World"
123.456 | round | string | upper;                 // "123"

// Transform with function equivalent
"hello" | upper;                // Same as upper("hello")
3.7 | round;                    // Same as round(3.7)
```

## Implementations

JexLang is available in multiple language implementations:

- [JavaScript/TypeScript Implementation](./packages/jexlang-ts/README.md)
- [Java Implementation](./packages/jexlang-java/README.md)

## License

[MIT License](LICENSE)
