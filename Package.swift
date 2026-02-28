// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "jexlang",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15),
        .tvOS(.v13),
        .watchOS(.v6),
        .visionOS(.v1),
    ],
    products: [
        .library(
            name: "JexlangSwift",
            targets: ["JexlangSwift"]
        ),
    ],
    targets: [
        .target(
            name: "ObjectiveCExceptionCatcher",
            path: "packages/jexlang-swift/jexlang-swift/eval/errors/ObjectiveCExceptionCatcher",
            publicHeadersPath: "."
        ),
        .target(
            name: "JexlangSwift",
            dependencies: ["ObjectiveCExceptionCatcher"],
            path: "packages/jexlang-swift/jexlang-swift",
            exclude: [
                "eval/errors/ObjectiveCExceptionCatcher",
                "grammar/JexLang.interp",
                "grammar/JexLang.tokens",
                "grammar/JexLangLexer.interp",
                "grammar/JexLangLexer.tokens",
                "jexlang_swift.h",
            ]
        ),
    ],
    swiftLanguageModes: [.v5]
)
