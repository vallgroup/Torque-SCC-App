/**
 * Composes an array of functions
 *
 * eg
 *
 * compose(
 *  withRouter,
 *  connect(...),
 *  memo,
 * )(Component)
 *
 * =>
 *
 * withRouter(connect(...)(memo(Component)))
 */
export default (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);
