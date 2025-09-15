import _base from './globals/base.js';
const {lsize} = _base;
export default function list(ul = {}) {
    if (!(
        ul instanceof NodeList
        && ul.length === lsize
    )) {
        throw new Error('list:failed');
    }
    return ul;
}
