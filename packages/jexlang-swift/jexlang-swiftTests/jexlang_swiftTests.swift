//
//  jexlang_swiftTests.swift
//  jexlang-swiftTests
//
//  Created by Vinay Kumar on 03/10/25.
//

import Testing
@testable import jexlang_swift

struct jexlang_swiftTests {

    @Test func example() async throws {
        // Write your test here and use APIs like `#expect(...)` to check expected conditions.
        let jexEvaluator = JexEvaluator();
        print(try? jexEvaluator.evaluate(expr: """
        {}
        """))
    }

}
