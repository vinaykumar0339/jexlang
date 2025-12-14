//
//  Functions.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public class Functions {
    public static func makeBultins() -> [String: FuncImpl] {
        var functions: [String: FuncImpl] = [:]
        
        // Math functions that work with numbers
        functions["abs"] = n1(abs, "abs function")
        functions["ceil"] = n1(ceil, "ceil function")
        functions["floor"] = n1(floor, "floor function")
        functions["round"] = n1(round, "round function")
        functions["trunc"] = n1(trunc, "trunc function")
        
        // Trigonometric functions
        functions["sin"] = n1(sin, "sin function")
        functions["cos"] = n1(cos, "cos function")
        functions["tan"] = n1(tan, "tan function")
        functions["asin"] = n1(asin, "asin function")
        functions["acos"] = n1(acos, "acos function")
        functions["atan"] = n1(atan, "atan function")
        
        // Exponential and logarithmic functions
        functions["exp"] = n1(exp, "exp function")
        functions["log"] = n1(log, "log function")
        functions["log10"] = n1(log10, "log10 function")
        functions["log2"] = n1(log2, "log2 function")
        functions["sqrt"] = n1(sqrt, "sqrt function")
        functions["cbrt"] = n1(cbrt, "cbrt function")
        
        // Hyperbolic functions
        functions["sinh"] = n1(sinh, "sinh function")
        functions["cosh"] = n1(cosh, "cosh function")
        functions["tanh"] = n1(tanh, "tanh function")
        functions["asinh"] = n1(asinh, "asinh function")
        functions["acosh"] = n1(acosh, "acosh function")
        functions["atanh"] = n1(atanh, "atanh function")
        
        // Utility functions
        functions["min"] = { (ctx, args) in
            if (args.count == 0) {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "min requires at least one argument"))
                return JexNil()
            }
            var best = Double.greatestFiniteMagnitude
            for i in 0..<args.count {
                let v = (toNumber(value: args[i], ctx: "min arg \(i+1)")).doubleValue
                if (v < best) {
                    best = v
                }
            }
            return num(best)
        }
        
        functions["max"] = { (ctx, args) in
            if (args.count == 0) {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "max requires at least one argument"))
                return JexNil()
            }
            var best = -Double.greatestFiniteMagnitude
            for i in 0..<args.count {
                let v = (toNumber(value: args[i], ctx: "max arg \(i+1)")).doubleValue
                if (v > best) {
                    best = v
                }
            }
            return num(best)
        }
        functions["pow"] = n2(pow, "pow base function", "pow exponent function")
        functions["random"] = { (ctx, args) in
            JexValueFactory.from(Double.random(in: 0...1))
        }
        functions["sign"] = n1({ Double(Int($0).signum()) }, "sign function")
        
        // Custom math functions
        functions["deg"] = n1({ $0 * 100.0 / .pi }, "deg function")
        functions["rad"] = n1({ x in
            (x * .pi) / 100.0
        }, "rad function")
        functions["clamp"] = n3({ v, lo, hi in
            if (lo > hi) {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "clmap: min (\(lo)) cannot be greater than max (\(hi))"))
                return 0
            }
            return min(max(v, lo), hi)
        }, "clamp value", "clamp min", "clamp max")
        functions["lerp"] = n3({ a, b, t in
            a + (b - a) * t
        }, "lerp a", "lerp b", "lerp t")
        
        // Type conversion functions
        functions["number"] = n1({ $0 }, "number function")
        functions["string"] = { (ctx, args) in
            str(toString(value: args[0], ctx: "string function"))
        }
        functions["boolean"] = { (ctx, args) in
            bool(toBoolean(value: args[0], ctx: "boolean function"))
        }
        functions["int"] = { (ctx, args) in
            integer(toNumber(value: args.count > 0 ? args[0] : JexValueFactory.from(0), ctx: "int transform").intValue)
        }
        functions["float"] = { (ctx, args) in
            doubleValue(toNumber(value: args.count > 0 ? args[0] : JexValueFactory.from(0), ctx: "float transform").doubleValue)
        }
        functions["double"] = { (ctx, args) in
            doubleValue(toNumber(value: args.count > 0 ? args[0] : JexValueFactory.from(0), ctx: "double transform").doubleValue)
        }
        
        // String functions
        functions["length"] = { (ctx, args) in
            let value = args[0]
            if (value.isString()) {
                return JexValueFactory.from((try! value.asString(context: "length method")).count)
            } else if (value.isArray()) {
                return JexValueFactory.from((try! value.asArray(context: "length method")).count)
            }
            
            NSException.raise(jexLangError: TypeMismatchError(operation: "length", expected: "string or array", actual: value.getType()))
            return JexNil()
        }
        functions["upper"] = { (ctx, args) in
            str(toString(value: args[0], ctx: "upper method").uppercased())
        }
        functions["lower"] = { (ctx, args) in
            str(toString(value: args[0], ctx: "lower method").lowercased())
        }
        functions["trim"] = { (ctx, args) in
            str(toString(value: args[0], ctx: "lower method").trimmingCharacters(in: .whitespacesAndNewlines))
        }
        
        // Array functions
        functions["array"] = { (ctx, args) in
            return JexValueFactory.from(args)
        }

        functions["first"] = { (ctx, args) in
            let arr = args[0]
            if !arr.isArray() {
                NSException.raise(
                    jexLangError: TypeMismatchError(
                        operation: "first",
                        expected: "array",
                        actual: arr.getType()
                    )
                )
                return JexNil()
            }
            let vs = try! arr.asArray(context: "first method")
            return vs.isEmpty ? JexNil() : vs[0]
        }

        functions["last"] = { (ctx, args) in
            let arr = args[0]
            if !arr.isArray() {
                NSException.raise(
                    jexLangError: TypeMismatchError(
                        operation: "last",
                        expected: "array",
                        actual: arr.getType()
                    )
                )
                return JexNil()
            }
            let vs = try! arr.asArray(context: "last method")
            return vs.isEmpty ? JexNil() : vs[vs.count - 1]
        }

        functions["push"] = { (ctx, args) in
            let arr = args[0]
            if !arr.isArray() {
                NSException.raise(
                    jexLangError: TypeMismatchError(
                        operation: "push",
                        expected: "array",
                        actual: arr.getType()
                    )
                )
                return JexNil()
            }
            var vs = try! arr.asArray(context: "push method")
            if args.count > 1 {
                vs.append(contentsOf: args[1...])
            }
            return JexValueFactory.from(vs)
        }

        functions["pop"] = { (ctx, args) in
            let arr = args[0]
            if !arr.isArray() {
                NSException.raise(
                    jexLangError: TypeMismatchError(
                        operation: "pop",
                        expected: "array",
                        actual: arr.getType()
                    )
                )
                return JexNil()
            }
            var vs = try! arr.asArray(context: "pop method")
            if vs.isEmpty {
                return JexNil()
            }
            return vs.removeLast()
        }

        functions["sum"] = { (ctx, args) in
            let arr = args[0]
            if !arr.isArray() {
                NSException.raise(
                    jexLangError: TypeMismatchError(
                        operation: "sum",
                        expected: "array",
                        actual: arr.getType()
                    )
                )
                return JexNil()
            }
            let vs = try! arr.asArray(context: "sum method")
            if vs.isEmpty {
                return num(0)
            }
            var s = 0.0
            for i in 0..<vs.count {
                s += toNumber(value: vs[i], ctx: "sum[\(i)]").doubleValue
            }
            return num(s)
        }

        functions["avg"] = { (ctx, args) in
            let arr = args[0]
            if !arr.isArray() {
                NSException.raise(
                    jexLangError: TypeMismatchError(
                        operation: "avg",
                        expected: "array",
                        actual: arr.getType()
                    )
                )
                return JexNil()
            }
            let vs = try! arr.asArray(context: "avg method")
            if vs.isEmpty {
                return JexNil()
            }
            var s = 0.0
            for i in 0..<vs.count {
                s += toNumber(value: vs[i], ctx: "avg[\(i)]").doubleValue
            }
            return num(s / Double(vs.count))
        }
        
        // Date & Time functions
        functions["now"] = { (ctx, args) in
            return num(Double(Date().timeIntervalSince1970 * 1000))
        }

        functions["today"] = { (ctx, args) in
            var cal = Calendar.current
            cal.timeZone = TimeZone.current
            let now = Date()
            let startOfDay = cal.startOfDay(for: now)
            return num(Double(startOfDay.timeIntervalSince1970 * 1000))
        }

        functions["date"] = { (ctx, args) in
            if args.count == 0 {
                return num(Double(Date().timeIntervalSince1970 * 1000))
            }
            let ts = toNumber(value: args[0], ctx: "date function").doubleValue
            return num(ts)
        }

        functions["year"] = { (ctx, args) in
            let cal = Calendar.current
            var date = Date()
            if args.count > 0 {
                let ts = toNumber(value: args[0], ctx: "year function").doubleValue
                date = Date(timeIntervalSince1970: ts / 1000)
            }
            return num(Double(cal.component(.year, from: date)))
        }

        functions["month"] = { (ctx, args) in
            let cal = Calendar.current
            var date = Date()
            if args.count > 0 {
                let ts = toNumber(value: args[0], ctx: "month function").doubleValue
                date = Date(timeIntervalSince1970: ts / 1000)
            }
            return num(Double(cal.component(.month, from: date)))
        }

        functions["day"] = { (ctx, args) in
            let cal = Calendar.current
            var date = Date()
            if args.count > 0 {
                let ts = toNumber(value: args[0], ctx: "day function").doubleValue
                date = Date(timeIntervalSince1970: ts / 1000)
            }
            return num(Double(cal.component(.day, from: date)))
        }

        functions["hour"] = { (ctx, args) in
            let cal = Calendar.current
            var date = Date()
            if args.count > 0 {
                let ts = toNumber(value: args[0], ctx: "hour function").doubleValue
                date = Date(timeIntervalSince1970: ts / 1000)
            }
            return num(Double(cal.component(.hour, from: date)))
        }

        functions["minute"] = { (ctx, args) in
            let cal = Calendar.current
            var date = Date()
            if args.count > 0 {
                let ts = toNumber(value: args[0], ctx: "minute function").doubleValue
                date = Date(timeIntervalSince1970: ts / 1000)
            }
            return num(Double(cal.component(.minute, from: date)))
        }

        functions["second"] = { (ctx, args) in
            let cal = Calendar.current
            var date = Date()
            if args.count > 0 {
                let ts = toNumber(value: args[0], ctx: "second function").doubleValue
                date = Date(timeIntervalSince1970: ts / 1000)
            }
            return num(Double(cal.component(.second, from: date)))
        }

        functions["weekday"] = { (ctx, args) in
            let cal = Calendar.current
            var date = Date()
            if args.count > 0 {
                let ts = toNumber(value: args[0], ctx: "weekday function").doubleValue
                date = Date(timeIntervalSince1970: ts / 1000)
            }
            return num(Double(cal.component(.weekday, from: date) - 1))
        }

        functions["addDays"] = { (ctx, args) in
            if args.count < 2 {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "addDays requires 2 arguments: timestamp, days"))
                return JexNil()
            }
            let cal = Calendar.current
            let ts = toNumber(value: args[0], ctx: "addDays timestamp").doubleValue
            let days = toNumber(value: args[1], ctx: "addDays days").intValue
            var date = Date(timeIntervalSince1970: ts / 1000)
            date = cal.date(byAdding: .day, value: days, to: date)!
            return num(Double(date.timeIntervalSince1970 * 1000))
        }

        functions["addMonths"] = { (ctx, args) in
            if args.count < 2 {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "addMonths requires 2 arguments: timestamp, months"))
                return JexNil()
            }
            let cal = Calendar.current
            let ts = toNumber(value: args[0], ctx: "addMonths timestamp").doubleValue
            let months = toNumber(value: args[1], ctx: "addMonths months").intValue
            var date = Date(timeIntervalSince1970: ts / 1000)
            date = cal.date(byAdding: .month, value: months, to: date)!
            return num(Double(date.timeIntervalSince1970 * 1000))
        }

        functions["addYears"] = { (ctx, args) in
            if args.count < 2 {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "addYears requires 2 arguments: timestamp, years"))
                return JexNil()
            }
            let cal = Calendar.current
            let ts = toNumber(value: args[0], ctx: "addYears timestamp").doubleValue
            let years = toNumber(value: args[1], ctx: "addYears years").intValue
            var date = Date(timeIntervalSince1970: ts / 1000)
            date = cal.date(byAdding: .year, value: years, to: date)!
            return num(Double(date.timeIntervalSince1970 * 1000))
        }

        functions["addHours"] = { (ctx, args) in
            if args.count < 2 {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "addHours requires 2 arguments: timestamp, hours"))
                return JexNil()
            }
            let cal = Calendar.current
            let ts = toNumber(value: args[0], ctx: "addHours timestamp").doubleValue
            let hours = toNumber(value: args[1], ctx: "addHours hours").intValue
            var date = Date(timeIntervalSince1970: ts / 1000)
            date = cal.date(byAdding: .hour, value: hours, to: date)!
            return num(Double(date.timeIntervalSince1970 * 1000))
        }

        functions["addMinutes"] = { (ctx, args) in
            if args.count < 2 {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "addMinutes requires 2 arguments: timestamp, minutes"))
                return JexNil()
            }
            let cal = Calendar.current
            let ts = toNumber(value: args[0], ctx: "addMinutes timestamp").doubleValue
            let minutes = toNumber(value: args[1], ctx: "addMinutes minutes").intValue
            var date = Date(timeIntervalSince1970: ts / 1000)
            date = cal.date(byAdding: .minute, value: minutes, to: date)!
            return num(Double(date.timeIntervalSince1970 * 1000))
        }

        functions["daysBetween"] = { (ctx, args) in
            if args.count < 2 {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "daysBetween requires 2 arguments: timestamp1, timestamp2"))
                return JexNil()
            }
            let ts1 = toNumber(value: args[0], ctx: "daysBetween timestamp1").doubleValue
            let ts2 = toNumber(value: args[1], ctx: "daysBetween timestamp2").doubleValue
            let cal = Calendar.current
            let d1 = cal.startOfDay(for: Date(timeIntervalSince1970: ts1 / 1000))
            let d2 = cal.startOfDay(for: Date(timeIntervalSince1970: ts2 / 1000))
            let days = abs(cal.dateComponents([.day], from: d1, to: d2).day!)
            return num(Double(days))
        }

        functions["isLeapYear"] = { (ctx, args) in
            if args.count < 1 {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "isLeapYear requires 1 argument: year"))
                return JexNil()
            }
            let year = toNumber(value: args[0], ctx: "isLeapYear year").intValue
            let isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
            return bool(isLeap)
        }

        functions["timestamp"] = { (ctx, args) in
            return num(Double(Date().timeIntervalSince1970))
        }
        
        return functions;
    }
    
    public static func createDefaultFuncRegistry() -> MapFuncRegistry {
        return MapFuncRegistry(makeBultins())
    }
}
