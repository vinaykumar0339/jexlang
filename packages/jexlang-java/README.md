# JexLang Java Implementation

This package provides a Java implementation of JexLang, a lightweight expression language designed for embedding expressions and simple logic in applications.

For comprehensive documentation on JexLang syntax and features, please see the [JexLang documentation on GitHub](https://github.com/vinaykumar0339/jexlang#readme).

## Using JexLang in Your Java Application

### Installation

Add the dependency to your project:

#### Maven
```xml
<dependency>
    <groupId>com.jexlang</groupId>
    <artifactId>jexlang-java</artifactId>
    <version>1.0.0</version>
</dependency>
```

#### Gradle
```gradle
implementation 'com.jexlang:jexlang-java:1.0.0'
```

### Quick Start

Here's a complete example showing how to use JexLang in your Java application:

```java
import com.jexlang.JexEvaluator;
import java.util.HashMap;
import java.util.Map;

public class JexLangDemo {
    public static void main(String[] args) {
        // Create an evaluator instance
        JexEvaluator evaluator = new JexEvaluator();
        
        // Define some expressions
        String expression1 = "let x = 10; x * 2";
        String expression2 = "PI * radius * radius";
        
        // Evaluate a simple expression
        Object result1 = evaluator.evaluate(expression1);
        System.out.println("Result 1: " + result1);  // 20
        
        // Evaluate with context variables
        Map<String, Object> context = new HashMap<>();
        context.put("radius", 5);
        Object result2 = evaluator.evaluate(expression2, context);
        System.out.println("Result 2: " + result2);  // ~78.54
    }
}
```

### Initialization Options

You can initialize JexLang with custom context, functions, and transforms:

```java
import com.jexlang.JexEvaluator;
import com.jexlang.Function;
import com.jexlang.Transform;
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

public class CustomJexLangDemo {
    public static void main(String[] args) {
        // Initial context values
        Map<String, Object> initialContext = new HashMap<>();
        initialContext.put("user", Map.of("name", "Alice", "isAdmin", true));
        initialContext.put("items", Arrays.asList(1, 2, 3, 4, 5));
        
        // Custom functions
        Map<String, Function> customFunctions = new HashMap<>();
        customFunctions.put("greet", args -> "Hello, " + args[0] + "!");
        customFunctions.put("double", args -> ((Number) args[0]).doubleValue() * 2);
        
        // Custom transforms
        Map<String, Transform> customTransforms = new HashMap<>();
        customTransforms.put("reversed", value -> 
            new StringBuilder(value.toString()).reverse().toString());
        
        // Create an evaluator with initial values
        JexEvaluator evaluator = new JexEvaluator(
            initialContext,
            customFunctions,
            customTransforms
        );
        
        // Now you can use these in expressions
        System.out.println(evaluator.evaluate("greet(user.name)"));  // "Hello, Alice!"
        System.out.println(evaluator.evaluate("items | sum"));       // 15
        System.out.println(evaluator.evaluate("\"hello\" | reversed")); // "olleh"
    }
}
```

### Global vs Program Context

JexLang offers two types of context for variables:

1. **Global Context**: Persists across multiple evaluations
2. **Program Context**: Only available for a single evaluation

```java
import com.jexlang.JexEvaluator;
import java.util.HashMap;
import java.util.Map;

public class ContextDemo {
    public static void main(String[] args) {
        // Create an evaluator
        JexEvaluator evaluator = new JexEvaluator();
        
        // Set global context values (persist across evaluations)
        evaluator.setContextValue("taxRate", 0.07);
        evaluator.setContextValue("company", "Acme Corp");
        
        // These can be used in any evaluation
        Object result = evaluator.evaluate("company + \" tax rate: \" + (taxRate * 100) + \"%\"");
        System.out.println(result);  // "Acme Corp tax rate: 7%"
        
        // Program context is passed directly to evaluate method
        Map<String, Object> context1 = new HashMap<>();
        context1.put("price", 100);
        Object result1 = evaluator.evaluate("price * (1 + taxRate)", context1);
        System.out.println(result1);  // 107
        
        Map<String, Object> context2 = new HashMap<>();
        context2.put("price", 200);
        Object result2 = evaluator.evaluate("price * (1 + taxRate)", context2);
        System.out.println(result2);  // 214
        
        // Program context overrides global context for that evaluation
        Map<String, Object> context3 = new HashMap<>();
        context3.put("price", 100);
        context3.put("taxRate", 0.05);  // Overrides global taxRate just for this call
        Object result3 = evaluator.evaluate("price * (1 + taxRate)", context3);
        System.out.println(result3);  // 105
    }
}
```

### Constant Variables

You can declare constant variables that cannot be modified:

```java
import com.jexlang.JexEvaluator;

public class ConstantsDemo {
    public static void main(String[] args) {
        // Create an evaluator
        JexEvaluator evaluator = new JexEvaluator();
        
        // Set immutable constants
        evaluator.declareContextValue("API_URL", "https://api.example.com", true);
        evaluator.declareContextValue("MAX_ITEMS", 100, true);
        
        // Attempt to modify will cause runtime error
        try {
            evaluator.evaluate("API_URL = \"https://newapi.example.com\"");
        } catch (Exception error) {
            System.err.println(error.getMessage());
            // "Variable 'API_URL' is a constant and cannot be re-declared or modified."
        }
    }
}
```

### Expression Caching

For performance optimization, you can enable expression caching:

```java
import com.jexlang.JexEvaluator;
import java.util.HashMap;
import java.util.Map;

public class CachingDemo {
    public static void main(String[] args) {
        JexEvaluator evaluator = new JexEvaluator();
        
        // Enable caching for frequently used expressions
        evaluator.setCacheExpressions(true);
        
        // First evaluation will parse and cache
        Map<String, Object> context1 = new HashMap<>();
        context1.put("x", 3);
        context1.put("y", 4);
        Object result1 = evaluator.evaluate("x * x + y * y", context1);
        System.out.println(result1);  // 25
        
        // Subsequent evaluations of the same expression will use the cached parse tree
        Map<String, Object> context2 = new HashMap<>();
        context2.put("x", 5);
        context2.put("y", 12);
        Object result2 = evaluator.evaluate("x * x + y * y", context2);
        System.out.println(result2);  // 169
        
        // Clear cache if needed
        evaluator.clearCachedParsedExpressions();
        
        // Disable caching
        evaluator.setCacheExpressions(false);
    }
}
```

### Complete Application Example

Here's a more complete example showing how JexLang can be integrated into a real Java application:

```java
import com.jexlang.JexEvaluator;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class PricingEngineDemo {
    static class PricingEngine {
        private JexEvaluator evaluator;
        
        public PricingEngine() {
            // Initial context
            Map<String, Object> initialContext = new HashMap<>();
            initialContext.put("baseDiscountRate", 0.05);
            initialContext.put("taxRate", 0.07);
            
            // Initialize the evaluator with base context and functions
            evaluator = new JexEvaluator(
                initialContext,
                Map.of(
                    "calculateShipping", args -> {
                        double distance = ((Number) args[0]).doubleValue();
                        double weight = ((Number) args[1]).doubleValue();
                        return Math.max(5, distance * 0.01 + weight * 0.5);
                    },
                    "isHoliday", args -> {
                        // Holiday detection logic here
                        return false;
                    }
                ),
                Map.of()
            );
            
            // Enable caching for performance
            evaluator.setCacheExpressions(true);
        }
        
        public Map<String, Object> calculatePrice(Map<String, Object> product, 
                                                 Map<String, Object> user, 
                                                 Map<String, Object> promoCode) {
            // Set up the program context for this specific calculation
            Map<String, Object> context = new HashMap<>();
            context.put("product", product);
            context.put("user", user);
            context.put("promoCode", promoCode);
            context.put("today", new Date());
            
            // Use the pricing formula (stored elsewhere, could be from database)
            String pricingFormula = """
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
            """;
            
            // Evaluate the pricing formula with the context
            @SuppressWarnings("unchecked")
            Map<String, Object> result = (Map<String, Object>) evaluator.evaluate(pricingFormula, context);
            return result;
        }
        
        public void updateTaxRate(double newRate) {
            // Update global context values as needed
            evaluator.setContextValue("taxRate", newRate);
        }
    }
    
    public static void main(String[] args) {
        PricingEngine engine = new PricingEngine();
        
        // Sample data
        Map<String, Object> product = new HashMap<>();
        product.put("basePrice", 99.99);
        product.put("quantity", 5);
        product.put("weightKg", 2.5);
        
        Map<String, Object> user = new HashMap<>();
        user.put("name", "Alice");
        user.put("isPremium", true);
        user.put("membershipYears", 3);
        user.put("distanceKm", 50);
        
        Map<String, Object> promoCode = new HashMap<>();
        promoCode.put("code", "SUMMER2023");
        promoCode.put("discountRate", 0.15);
        promoCode.put("expiryDate", new Date(2023 - 1900, 8, 30).getTime());
        
        Map<String, Object> priceBreakdown = engine.calculatePrice(product, user, promoCode);
        System.out.println(priceBreakdown);
    }
}
```
