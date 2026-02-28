//
//  ObjectiveCExceptionCatcher.h
//  jexlang-swift
//
//  Created by Vinay Kumar on 10/12/25.
//

#ifndef ObjectiveCExceptionCatcher_h
#define ObjectiveCExceptionCatcher_h

#import <Foundation/Foundation.h>

// A helper class to safely run a block of code and catch NSExceptions
@interface ObjectiveCExceptionCatcher : NSObject

// Executes the provided block and returns the caught NSException, if any.
+ (nullable NSException *)catchException:(void(^_Nullable)(void))tryBlock;

@end

#endif /* ObjectiveCExceptionCatcher_h */
