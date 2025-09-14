// @ts-check
import _base from './globals/base.js';
const {lsize} = _base;

function list(ul = {}) {
    if (!(
        ul instanceof NodeList
        && ul.length === lsize
    )) {
        throw new Error('list:failed');
    }
    return ul;
}

export default list;