//
//  Utils.swift
//  jexlang-swiftTests
//
//  Created by Vinay Kumar on 14/12/25.
//

import Foundation

func deepEqual(_ a: Any?, _ b: Any?) -> Bool {

    switch (a, b) {

    case (nil, nil):
        return true

    case let (x as Int, y as Int):
        return x == y

    case let (x as Double, y as Double):
        return x == y

    case let (x as String, y as String):
        return x == y

    case let (x as Bool, y as Bool):
        return x == y

    case let (x as [Any?], y as [Any?]):
        guard x.count == y.count else { return false }
        return zip(x, y).allSatisfy { deepEqual($0, $1) }

    case let (x as [String: Any?], y as [String: Any?]):
        guard x.count == y.count else { return false }
        for (k, vx) in x {
            guard let vy = y[k], deepEqual(vx, vy) else { return false }
        }
        return true

    default:
        return false
    }
}
