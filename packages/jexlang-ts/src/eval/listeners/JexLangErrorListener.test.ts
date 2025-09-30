import { describe, it, expect, beforeEach } from 'vitest';
import { JexLangErrorListener } from './JexLangErrorListener';
import { JexLangSyntaxError } from '../errors';
import { Recognizer, RecognitionException } from 'antlr4';

describe('JexLangErrorListener', () => {
    let errorListener: JexLangErrorListener;
    let mockRecognizer: Recognizer<any>;
    let mockRecognitionException: RecognitionException;

    beforeEach(() => {
        errorListener = new JexLangErrorListener();
        mockRecognizer = {} as Recognizer<any>;
        mockRecognitionException = {} as RecognitionException;
    });

    describe('constructor', () => {
        it('should create error listener with empty errors array', () => {
            const listener = new JexLangErrorListener();
            expect(listener.hasErrors()).toBe(false);
            expect(listener.getErrors()).toEqual([]);
        });
    });

    describe('syntaxError', () => {
        it('should add syntax error to errors collection', () => {
            const offendingSymbol = { text: 'badToken' };
            
            errorListener.syntaxError(
                mockRecognizer,
                offendingSymbol,
                1,
                5,
                'test error message',
                mockRecognitionException
            );

            expect(errorListener.hasErrors()).toBe(true);
            expect(errorListener.getErrors()).toHaveLength(1);
            
            const error = errorListener.getErrors()[0];
            expect(error).toBeInstanceOf(JexLangSyntaxError);
            expect(error.message).toContain('Syntax error at line 1:5');
            expect(error.location?.line).toBe(1);
            expect(error.location?.column).toBe(5);
            expect(error.location?.offendingSymbol).toBe('badToken');
        });

        it('should handle null offending symbol', () => {
            errorListener.syntaxError(
                mockRecognizer,
                null,
                2,
                10,
                'error without symbol',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.location?.offendingSymbol).toBeNull();
        });

        it('should handle undefined offending symbol', () => {
            errorListener.syntaxError(
                mockRecognizer,
                undefined,
                3,
                15,
                'error with undefined symbol',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.location?.offendingSymbol).toBeNull();
        });

        it('should handle offending symbol without text property', () => {
            const offendingSymbol = { type: 'TOKEN' };
            
            errorListener.syntaxError(
                mockRecognizer,
                offendingSymbol,
                4,
                20,
                'error with symbol without text',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.location?.offendingSymbol).toBeUndefined();
        });

        it('should accumulate multiple errors', () => {
            errorListener.syntaxError(mockRecognizer, { text: 'token1' }, 1, 0, 'first error', mockRecognitionException);
            errorListener.syntaxError(mockRecognizer, { text: 'token2' }, 2, 5, 'second error', mockRecognitionException);
            errorListener.syntaxError(mockRecognizer, { text: 'token3' }, 3, 10, 'third error', mockRecognitionException);

            expect(errorListener.getErrors()).toHaveLength(3);
            expect(errorListener.getErrors()[0].location?.line).toBe(1);
            expect(errorListener.getErrors()[1].location?.line).toBe(2);
            expect(errorListener.getErrors()[2].location?.line).toBe(3);
        });
    });

    describe('formatErrorMessage', () => {
        it('should replace "no viable alternative at input" with "Unexpected"', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'token' },
                1,
                0,
                'no viable alternative at input \'token\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('Unexpected');
            expect(error.message).not.toContain('no viable alternative at input');
        });

        it('should replace "extraneous input" with "Unexpected"', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'extra' },
                1,
                0,
                'extraneous input \'extra\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('Unexpected');
            expect(error.message).not.toContain('extraneous input');
        });

        it('should replace "mismatched input" with "Unexpected"', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'wrong' },
                1,
                0,
                'mismatched input \'wrong\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('Unexpected');
            expect(error.message).not.toContain('mismatched input');
        });

        it('should replace "expecting" with "expected"', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'token' },
                1,
                0,
                'expecting \';\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('expected');
            expect(error.message).not.toContain('expecting');
        });

        it('should format complete error message with line and column', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'bad' },
                5,
                12,
                'test message',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toBe('Syntax error at line 5:12: test message');
        });
    });

    describe('escapeString', () => {
        it('should escape newline characters', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'line1\nline2' },
                1,
                0,
                'error with \'line1\nline2\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('line1\\nline2');
            expect(error.message).not.toContain('line1\nline2');
        });

        it('should escape carriage return characters', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'text\rmore' },
                1,
                0,
                'error with \'text\rmore\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('text\\rmore');
            expect(error.message).not.toContain('text\rmore');
        });

        it('should escape tab characters', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'text\ttab' },
                1,
                0,
                'error with \'text\ttab\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('text\\ttab');
            expect(error.message).not.toContain('text\ttab');
        });

        it('should escape multiple special characters', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'line1\n\r\tline2' },
                1,
                0,
                'error with \'line1\n\r\tline2\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('line1\\n\\r\\tline2');
        });
    });

    describe('hasErrors', () => {
        it('should return false when no errors exist', () => {
            expect(errorListener.hasErrors()).toBe(false);
        });

        it('should return true when errors exist', () => {
            errorListener.syntaxError(mockRecognizer, { text: 'token' }, 1, 0, 'error', mockRecognitionException);
            expect(errorListener.hasErrors()).toBe(true);
        });

        it('should return false after clearing errors', () => {
            errorListener.syntaxError(mockRecognizer, { text: 'token' }, 1, 0, 'error', mockRecognitionException);
            expect(errorListener.hasErrors()).toBe(true);
            
            errorListener.clear();
            expect(errorListener.hasErrors()).toBe(false);
        });
    });

    describe('getErrors', () => {
        it('should return empty array when no errors exist', () => {
            expect(errorListener.getErrors()).toEqual([]);
        });

        it('should return array of syntax errors', () => {
            errorListener.syntaxError(mockRecognizer, { text: 'token1' }, 1, 0, 'first error', mockRecognitionException);
            errorListener.syntaxError(mockRecognizer, { text: 'token2' }, 2, 5, 'second error', mockRecognitionException);

            const errors = errorListener.getErrors();
            expect(errors).toHaveLength(2);
            expect(errors[0]).toBeInstanceOf(JexLangSyntaxError);
            expect(errors[1]).toBeInstanceOf(JexLangSyntaxError);
        });

        it('should return reference to internal errors array', () => {
            const errors1 = errorListener.getErrors();
            errorListener.syntaxError(mockRecognizer, { text: 'token' }, 1, 0, 'error', mockRecognitionException);
            const errors2 = errorListener.getErrors();
            
            expect(errors1).toBe(errors2);
            expect(errors2).toHaveLength(1);
        });
    });

    describe('clear', () => {
        it('should clear all errors', () => {
            errorListener.syntaxError(mockRecognizer, { text: 'token1' }, 1, 0, 'error1', mockRecognitionException);
            errorListener.syntaxError(mockRecognizer, { text: 'token2' }, 2, 0, 'error2', mockRecognitionException);
            
            expect(errorListener.hasErrors()).toBe(true);
            expect(errorListener.getErrors()).toHaveLength(2);
            
            errorListener.clear();
            
            expect(errorListener.hasErrors()).toBe(false);
            expect(errorListener.getErrors()).toHaveLength(0);
        });

        it('should allow adding new errors after clearing', () => {
            errorListener.syntaxError(mockRecognizer, { text: 'token1' }, 1, 0, 'error1', mockRecognitionException);
            errorListener.clear();
            errorListener.syntaxError(mockRecognizer, { text: 'token2' }, 2, 0, 'error2', mockRecognitionException);
            
            expect(errorListener.hasErrors()).toBe(true);
            expect(errorListener.getErrors()).toHaveLength(1);
            expect(errorListener.getErrors()[0].location?.offendingSymbol).toBe('token2');
        });
    });

    describe('complex scenarios', () => {
        it('should handle multiple error message transformations', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'token' },
                1,
                0,
                'no viable alternative at input \'token\' expecting \';\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toContain('Unexpected');
            expect(error.message).toContain('expected');
            expect(error.message).not.toContain('no viable alternative at input');
            expect(error.message).not.toContain('expecting');
        });

        it('should handle error with special characters in token', () => {
            errorListener.syntaxError(
                mockRecognizer,
                { text: 'token\n\t\r' },
                3,
                8,
                'mismatched input \'token\n\t\r\'',
                mockRecognitionException
            );

            const error = errorListener.getErrors()[0];
            expect(error.message).toBe('Syntax error at line 3:8: Unexpected \'token\\n\\t\\r\'');
            expect(error.location?.line).toBe(3);
            expect(error.location?.column).toBe(8);
            expect(error.location?.offendingSymbol).toBe('token\n\t\r');
        });

        it('should maintain error order', () => {
            const errors = [
                { line: 1, col: 0, msg: 'error 1', token: 'a' },
                { line: 5, col: 10, msg: 'error 2', token: 'b' },
                { line: 2, col: 3, msg: 'error 3', token: 'c' }
            ];

            errors.forEach(({ line, col, msg, token }) => {
                errorListener.syntaxError(mockRecognizer, { text: token }, line, col, msg, mockRecognitionException);
            });

            const collectedErrors = errorListener.getErrors();
            expect(collectedErrors).toHaveLength(3);
            expect(collectedErrors[0].location?.line).toBe(1);
            expect(collectedErrors[1].location?.line).toBe(5);
            expect(collectedErrors[2].location?.line).toBe(2);
        });
    });
});