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
        do {
            let jexEvaluator = try! JexEvaluator();
            let output = try! jexEvaluator.evaluate(expr: """
            call()
            """)
            let output1 = try! jexEvaluator.evaluate(expr: """
            2.0 + 2
            """)
            let output2 = try! jexEvaluator.evaluate(expr: """
            "2" + (2 + 100)
            """)
            print(output, output1, output2)
        } catch {
            print(error)
        }
    }

}
