/**
 * @typedef Schema<T>
 * @property {function(any): T} cast
 * @property {function(any, ValidationOptions?): ValidationResult<T>} validate
 * @property {function(string, PluckOptions?): Schema?} pluck
 * @property {function(object): Schema} extend
 */

/**
 * @typedef {object} ValidationOptions
 * @property {boolean} abortEarly
 */

/**
 * @typedef ValidationResult<T>
 * @property {T?} result
 * @property {Error?} error
 */

/**
 * @typedef {object} PluckOptions
 */
