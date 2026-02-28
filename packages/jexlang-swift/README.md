# JexLang Swift Implementation

JexLang Swift is the Swift implementation of JexLang, a lightweight expression language for runtime formulas and rules.

- Repository: `https://github.com/vinaykumar0339/jexlang`
- SPM product name: `JexlangSwift`
- Swift module import: `import JexlangSwift`

## Requirements

- Xcode 16+
- Swift 6+
- Apple platforms (iOS, macOS, tvOS, watchOS, visionOS)

## Install in Xcode (Swift Package Manager)

1. In Xcode, open your app project.
2. Go to **File > Add Package Dependencies...**
3. Enter: `https://github.com/vinaykumar0339/jexlang.git`
4. Choose a dependency rule.
5. Add the `JexlangSwift` product to your target.

Note: until version tags are published, use the `main` branch.

## Install in `Package.swift`

```swift
dependencies: [
    .package(url: "https://github.com/vinaykumar0339/jexlang.git", branch: "main")
],
targets: [
    .target(
        name: "MyApp",
        dependencies: [
            .product(name: "JexlangSwift", package: "jexlang")
        ]
    )
]
```

## Local Development (Clone + Add Local Package)

1. Clone the repo.
2. In Xcode, use **File > Add Package Dependencies...**
3. Click **Add Local...** and select the cloned `jexlang` repository root.
4. Add `JexlangSwift` to your target.

## Quick Start

```swift
import Foundation
import JexlangSwift

let evaluator = try JexEvaluator(
    context: [
        "taxRate": 0.18
    ]
)

let result = try evaluator.evaluate(
    expr: "price * (1 + taxRate)",
    programScopeVariables: [
        "price": 1000
    ]
)

print(result) // 1180
```

## Custom Functions

```swift
import JexlangSwift

let customFunctions: [String: FuncImpl] = [
    "double": { _, args in
        guard let first = args.first else { return JexNull() }
        let value = toNumber(value: first, ctx: "double").doubleValue
        return JexValueFactory.from(value * 2)
    }
]

let evaluator = try JexEvaluator(funcsMap: customFunctions)
let result = try evaluator.evaluate(expr: "double(21)")
print(result) // 42
```

## Useful APIs

- `JexEvaluator(context:funcsMap:transformMap:)`
- `evaluate(expr:programScopeVariables:)`
- `setContextValue(_:_)`
- `declareContextValue(_:value:isConst:)`
- `setCacheExpressions(_:)`
- `clearCachedParsedExpression()`

Built-in globals include `PI`, `E`, and `VERSION`.

## Language Reference

- [JexLang Language Reference](../../docs/language-reference.md)
