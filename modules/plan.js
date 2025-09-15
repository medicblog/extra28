import _base from './globals/base.js';
const {radius} = _base;
export default function plan(p = {}) {
    if (!(
        p instanceof HTMLElement
        && p.offsetWidth === 2 * radius
        && p.offsetHeight === p.offsetWidth
    )) {
        throw new Error('plan:failed');
    }
    return p;
}
