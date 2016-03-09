'use strict';

import * as restify from 'restify';

interface Dictionary<T> { [key: string]: T; }

interface ValidatorFunction {
  (item: string, message: string): Validator;
}

export interface RequestEx extends restify.Request {
  user?: any;

  // methods added by connect validator module
  checkBody: ValidatorFunction;
  checkParams: ValidatorFunction;

  validationErrors(mapped?: boolean): Dictionary<any> | any[];
}

export interface Validator {
  /**
   * Alias for regex()
   */
  is(): Validator;
  /**
   * Alias for notRegex()
   */
  not(): Validator;
  isEmail(): Validator;
  /**
   * Accepts http, https, ftp
   */
  isUrl(): Validator;
  /**
   * Combines isIPv4 and isIPv6
   */
  isIP(): Validator;
  isIPv4(): Validator;
  isIPv6(): Validator;
  isAlpha(): Validator;
  isAlphanumeric(): Validator;
  isNumeric(): Validator;
  isHexadecimal(): Validator;
  /**
   * Accepts valid hexcolors with or without # prefix
   */
  isHexColor(): Validator;
  /**
   * isNumeric accepts zero padded numbers, e.g. '001', isInt doesn't
   */
  isInt(): Validator;
  isLowercase(): Validator;
  isUppercase(): Validator;
  isDecimal(): Validator;
  /**
   * Alias for isDecimal
   */
  isFloat(): Validator;
  /**
   * Check if length is 0
   */
  isNull(): Validator;
  /**
   * Not just whitespace (input.trim().length !== 0)
   */
  notEmpty(): Validator;
  equals(equals: any): Validator;
  contains(str: string): Validator;
  notContains(str: string): Validator;
  /**
   * Usage: regex(/[a-z]/i) or regex('[a-z]','i')
   */
  regex(pattern: string, modifiers: string): Validator;
  notRegex(pattern: string, modifiers: string): Validator;
  /**
   * max is optional
   */
  len(min: number, max?: number): Validator;
  /**
   * Version can be 3, 4 or 5 or empty,
   * see http://en.wikipedia.org/wiki/Universally_unique_identifier
   */
  isUUID(version: number): Validator;
  /**
   * Alias for isUUID(3)
   */
  isUUIDv3(): Validator;
  /**
   * Alias for isUUID(4)
   */
  isUUIDv4(): Validator;
  /**
   * Alias for isUUID(5)
   */
  isUUIDv5(): Validator;
  /**
   * Uses Date.parse() - regex is probably a better choice
   */
  isDate(): Validator;
  /**
   * Argument is optional and defaults to today. Comparison is non-inclusive
   */
  isAfter(date: Date): Validator;
  /**
   * Argument is optional and defaults to today. Comparison is non-inclusive
   */
  isBefore(date: Date): Validator;
  isIn(options: string): Validator;
  isIn(options: string[]): Validator;
  notIn(options: string): Validator;
  notIn(options: string[]): Validator;
  max(val: string): Validator;
  min(val: string): Validator;
  /**
   * Will work against Visa, MasterCard, American Express, Discover,
   * Diners Club, and JCB card numbering formats
   */
  isCreditCard(): Validator;
  /**
   * Check an input only when the input exists
   */
  optional(): Validator;

  isArray(): Validator;
  hasElements(): Validator;
  doesNotStartsWithInternalKV(): Validator;
}
