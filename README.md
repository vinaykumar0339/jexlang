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
- [Language Documentation](./docs/language-reference.md)

## Implementations

JexLang is available in multiple language implementations:

- [JavaScript/TypeScript Implementation](./packages/jexlang-ts/README.md)
- [Java Implementation](./packages/jexlang-java/README.md)
- [Swift Implementation](./packages/jexlang-swift/README.md)

## License
[MIT License](LICENSE)
