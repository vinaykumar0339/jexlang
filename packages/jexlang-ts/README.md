# JexLang TypeScript Implementation

This package provides a TypeScript implementation of JexLang, a lightweight expression language designed for embedding expressions and simple logic in applications.

For comprehensive documentation on JexLang syntax and features, please see the [main JexLang documentation](../../README.md).

## Using JexLang in Your Application

### Installation

```bash
npm install jexlang-ts
```

### Quick Start

Here's a complete example showing how to use JexLang in your application:

```typescript
import { JexEvaluator } from 'jexlang-ts';

// Create an evaluator instance
const evaluator = new JexEvaluator();

// Define some expressions
const expression1 = 'let x = 10; x * 2';
const expression2 = 'PI * radius * radius';

// Evaluate a simple expression
const result1 = evaluator.evaluate(expression1);
console.log('Result 1:', result1);  // 20

// Evaluate with context variables
const result2 = evaluator.evaluate(expression2, { radius: 5 });
console.log('Result 2:', result2);  // ~78.54
```

### Initialization Options

You can initialize JexLang with custom context, functions, and transforms:

```typescript
// Initial context values, functions, and transforms
const initialContext = {
  user: { name: 'Alice', isAdmin: true },
  items: [1, 2, 3, 4, 5]
};

const customFunctions = {
  greet: (name) => `Hello, ${name}!`,
  double: (x) => x * 2
};

const customTransforms = {
  reversed: (str) => String(str).split('').reverse().join('')
};

// Create an evaluator with initial values
const evaluator = new JexEvaluator(
  initialContext,
  customFunctions,
  customTransforms
);

// Now you can use these in expressions
evaluator.evaluate('greet(user.name)');  // "Hello, Alice!"
evaluator.evaluate('items | sum');       // 15
evaluator.evaluate('"hello" | reversed'); // "olleh"
```

### Global vs Program Context

JexLang offers two types of context for variables:

1. **Global Context**: Persists across multiple evaluations
2. **Program Context**: Only available for a single evaluation

```typescript
// Create an evaluator
const evaluator = new JexEvaluator();

// Set global context values (persist across evaluations)
evaluator.setContextValue('taxRate', 0.07);
evaluator.setContextValue('company', 'Acme Corp');

// These can be used in any evaluation
evaluator.evaluate('company + " tax rate: " + (taxRate * 100) + "%"');
// Returns: "Acme Corp tax rate: 7%"

// Program context is passed directly to evaluate method
const result1 = evaluator.evaluate('price * (1 + taxRate)', { price: 100 });
// Returns: 107

const result2 = evaluator.evaluate('price * (1 + taxRate)', { price: 200 });
// Returns: 214

// Program context overrides global context for that evaluation
const result3 = evaluator.evaluate('price * (1 + taxRate)', { 
  price: 100, 
  taxRate: 0.05  // Overrides global taxRate just for this call
});
// Returns: 105
```

### Constant Variables

You can declare constant variables that cannot be modified:

```typescript
// Create an evaluator
const evaluator = new JexEvaluator();

// Set immutable constants
evaluator.declareContextValue('API_URL', 'https://api.example.com', true);
evaluator.declareContextValue('MAX_ITEMS', 100, true);

// Attempt to modify will cause runtime error
try {
  evaluator.evaluate('API_URL = "https://newapi.example.com"');
} catch (error) {
  console.error(error.message);
  // "Variable 'API_URL' is a constant and cannot be re-declared or modified."
}
```

### Expression Caching

For performance optimization, you can enable expression caching:

```typescript
// Enable caching for frequently used expressions
evaluator.setCacheExpressions(true);

// First evaluation will parse and cache
const result1 = evaluator.evaluate('x * x + y * y', { x: 3, y: 4 });

// Subsequent evaluations of the same expression will use the cached parse tree
const result2 = evaluator.evaluate('x * x + y * y', { x: 5, y: 12 });

// Clear cache if needed
evaluator.clearCachedParsedExpressions();

// Disable caching
evaluator.setCacheExpressions(false);
```

### Complete Application Example

Here's a more complete example showing how JexLang can be integrated into a real application:

```typescript
import { JexEvaluator } from 'jexlang-ts';

class PricingEngine {
  private evaluator: JexEvaluator;
  
  constructor() {
    // Initialize the evaluator with base context and functions
    this.evaluator = new JexEvaluator(
      // Initial context
      {
        baseDiscountRate: 0.05,
        taxRate: 0.07
      },
      // Custom functions
      {
        calculateShipping: (distance, weight) => {
          return Math.max(5, distance * 0.01 + weight * 0.5);
        },
        isHoliday: (date) => {
          // Holiday detection logic here
          return false;
        }
      }
    );
    
    // Enable caching for performance
    this.evaluator.setCacheExpressions(true);
  }
  
  calculatePrice(product, user, promoCode) {
    // Set up the program context for this specific calculation
    const context = {
      product: product,
      user: user,
      promoCode: promoCode,
      today: new Date()
    };
    
    // Use the pricing formula (stored elsewhere, could be from database)
    const pricingFormula = `
      // Start with base price
      let price = product.basePrice;
      
      // Apply quantity discounts
      if (product.quantity > 10) {
        price = price * 0.9;
      }
      
      // Apply user-specific discounts
      let userDiscount = user.isPremium ? 0.1 : 0;
      if (user.membershipYears > 2) {
        userDiscount = userDiscount + 0.02 * user.membershipYears;
      }
      
      // Apply promo code if valid
      let promoDiscount = 0;
      if (promoCode && today < date(promoCode.expiryDate)) {
        promoDiscount = promoCode.discountRate;
      }
      
      // Calculate final price with all discounts
      let discountedPrice = price * (1 - Math.max(userDiscount, promoDiscount));
      
      // Add shipping
      let shippingCost = calculateShipping(user.distanceKm, product.weightKg);
      
      // Add tax
      let finalPrice = (discountedPrice + shippingCost) * (1 + taxRate);
      
      // Holiday special
      if (isHoliday(today)) {
        finalPrice = finalPrice * 0.95;
      }
      
      // Return result object
      {
        subtotal: price,
        discount: price - discountedPrice,
        shipping: shippingCost,
        tax: (discountedPrice + shippingCost) * taxRate,
        total: finalPrice
      }
    `;
    
    // Evaluate the pricing formula with the context
    return this.evaluator.evaluate(pricingFormula, context);
  }
  
  updateTaxRate(newRate) {
    // Update global context values as needed
    this.evaluator.setContextValue('taxRate', newRate);
  }
}

// Usage
const engine = new PricingEngine();

const product = {
  basePrice: 99.99,
  quantity: 5,
  weightKg: 2.5
};

const user = {
  name: "Alice",
  isPremium: true,
  membershipYears: 3,
  distanceKm: 50
};

const promoCode = {
  code: "SUMMER2023",
  discountRate: 0.15,
  expiryDate: new Date(2023, 8, 30).getTime()
};

const priceBreakdown = engine.calculatePrice(product, user, promoCode);
console.log(priceBreakdown);
```

## License

MIT License
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
| `__CLIENT_LANGUAGE` | Implementation language | "javascript" |

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

## Using JexLang in Your Application

### Quick Start

Here's a complete example showing how to use JexLang in your application:

```typescript
import { JexEvaluator } from 'jexlang-ts';

// Create an evaluator instance
const evaluator = new JexEvaluator();

// Define some expressions
const expression1 = 'let x = 10; x * 2';
const expression2 = 'PI * radius * radius';

// Evaluate a simple expression
const result1 = evaluator.evaluate(expression1);
console.log('Result 1:', result1);  // 20

// Evaluate with context variables
const result2 = evaluator.evaluate(expression2, { radius: 5 });
console.log('Result 2:', result2);  // ~78.54
```

### Initialization Options

You can initialize JexLang with custom context, functions, and transforms:

```typescript
// Initial context values, functions, and transforms
const initialContext = {
  user: { name: 'Alice', isAdmin: true },
  items: [1, 2, 3, 4, 5]
};

const customFunctions = {
  greet: (name) => `Hello, ${name}!`,
  double: (x) => x * 2
};

const customTransforms = {
  reversed: (str) => String(str).split('').reverse().join('')
};

// Create an evaluator with initial values
const evaluator = new JexEvaluator(
  initialContext,
  customFunctions,
  customTransforms
);

// Now you can use these in expressions
evaluator.evaluate('greet(user.name)');  // "Hello, Alice!"
evaluator.evaluate('items | sum');       // 15
evaluator.evaluate('"hello" | reversed'); // "olleh"
```

### Global vs Program Context

JexLang offers two types of context for variables:

1. **Global Context**: Persists across multiple evaluations
2. **Program Context**: Only available for a single evaluation

```typescript
// Create an evaluator
const evaluator = new JexEvaluator();

// Set global context values (persist across evaluations)
evaluator.setContextValue('taxRate', 0.07);
evaluator.setContextValue('company', 'Acme Corp');

// These can be used in any evaluation
evaluator.evaluate('company + " tax rate: " + (taxRate * 100) + "%"');
// Returns: "Acme Corp tax rate: 7%"

// Program context is passed directly to evaluate method
const result1 = evaluator.evaluate('price * (1 + taxRate)', { price: 100 });
// Returns: 107

const result2 = evaluator.evaluate('price * (1 + taxRate)', { price: 200 });
// Returns: 214

// Program context overrides global context for that evaluation
const result3 = evaluator.evaluate('price * (1 + taxRate)', { 
  price: 100, 
  taxRate: 0.05  // Overrides global taxRate just for this call
});
// Returns: 105
```

### Constant Variables

You can declare constant variables that cannot be modified:

```typescript
// Create an evaluator
const evaluator = new JexEvaluator();

// Set immutable constants
evaluator.declareContextValue('API_URL', 'https://api.example.com', true);
evaluator.declareContextValue('MAX_ITEMS', 100, true);

// Attempt to modify will cause runtime error
try {
  evaluator.evaluate('API_URL = "https://newapi.example.com"');
} catch (error) {
  console.error(error.message);
  // "Variable 'API_URL' is a constant and cannot be re-declared or modified."
}
```

### Expression Caching

For performance optimization, you can enable expression caching:

```typescript
// Enable caching for frequently used expressions
evaluator.setCacheExpressions(true);

// First evaluation will parse and cache
const result1 = evaluator.evaluate('x * x + y * y', { x: 3, y: 4 });

// Subsequent evaluations of the same expression will use the cached parse tree
const result2 = evaluator.evaluate('x * x + y * y', { x: 5, y: 12 });

// Clear cache if needed
evaluator.clearCachedParsedExpressions();

// Disable caching
evaluator.setCacheExpressions(false);
```

### Complete Application Example

Here's a more complete example showing how JexLang can be integrated into a real application:

```typescript
import { JexEvaluator } from 'jexlang-ts';

class PricingEngine {
  private evaluator: JexEvaluator;
  
  constructor() {
    // Initialize the evaluator with base context and functions
    this.evaluator = new JexEvaluator(
      // Initial context
      {
        baseDiscountRate: 0.05,
        taxRate: 0.07
      },
      // Custom functions
      {
        calculateShipping: (distance, weight) => {
          return Math.max(5, distance * 0.01 + weight * 0.5);
        },
        isHoliday: (date) => {
          // Holiday detection logic here
          return false;
        }
      }
    );
    
    // Enable caching for performance
    this.evaluator.setCacheExpressions(true);
  }
  
  calculatePrice(product, user, promoCode) {
    // Set up the program context for this specific calculation
    const context = {
      product: product,
      user: user,
      promoCode: promoCode,
      today: new Date()
    };
    
    // Use the pricing formula (stored elsewhere, could be from database)
    const pricingFormula = `
      // Start with base price
      let price = product.basePrice;
      
      // Apply quantity discounts
      if (product.quantity > 10) {
        price = price * 0.9;
      }
      
      // Apply user-specific discounts
      let userDiscount = user.isPremium ? 0.1 : 0;
      if (user.membershipYears > 2) {
        userDiscount = userDiscount + 0.02 * user.membershipYears;
      }
      
      // Apply promo code if valid
      let promoDiscount = 0;
      if (promoCode && today < date(promoCode.expiryDate)) {
        promoDiscount = promoCode.discountRate;
      }
      
      // Calculate final price with all discounts
      let discountedPrice = price * (1 - Math.max(userDiscount, promoDiscount));
      
      // Add shipping
      let shippingCost = calculateShipping(user.distanceKm, product.weightKg);
      
      // Add tax
      let finalPrice = (discountedPrice + shippingCost) * (1 + taxRate);
      
      // Holiday special
      if (isHoliday(today)) {
        finalPrice = finalPrice * 0.95;
      }
      
      // Return result object
      {
        subtotal: price,
        discount: price - discountedPrice,
        shipping: shippingCost,
        tax: (discountedPrice + shippingCost) * taxRate,
        total: finalPrice
      }
    `;
    
    // Evaluate the pricing formula with the context
    return this.evaluator.evaluate(pricingFormula, context);
  }
  
  updateTaxRate(newRate) {
    // Update global context values as needed
    this.evaluator.setContextValue('taxRate', newRate);
  }
}

// Usage
const engine = new PricingEngine();

const product = {
  basePrice: 99.99,
  quantity: 5,
  weightKg: 2.5
};

const user = {
  name: "Alice",
  isPremium: true,
  membershipYears: 3,
  distanceKm: 50
};

const promoCode = {
  code: "SUMMER2023",
  discountRate: 0.15,
  expiryDate: new Date(2023, 8, 30).getTime()
};

const priceBreakdown = engine.calculatePrice(product, user, promoCode);
console.log(priceBreakdown);
```
