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
