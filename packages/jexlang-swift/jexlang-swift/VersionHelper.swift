//
//  VersionHelper.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public enum Version {
    public static var value: String {
        let bundle = Bundle(for: _BundleMarker.self)
        return bundle.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown"
    }

    private final class _BundleMarker {}
}
