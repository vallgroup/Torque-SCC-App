/**
 * Composes an array of functions
 */
export default (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);
