//
//  ObjectiveCExceptionCatcher.m
//  jexlang-swift
//
//  Created by Vinay Kumar on 10/12/25.
//

#import <Foundation/Foundation.h>

#import "ObjectiveCExceptionCatcher.h"

@implementation ObjectiveCExceptionCatcher

+ (NSException *)catchException:(void (^)(void))tryBlock {
    @try {
        if (tryBlock) {
            tryBlock();
        }
        return nil; // No exception occurred
    } @catch (NSException *exception) {
        return exception; // Return the caught exception
    }
}

@end
